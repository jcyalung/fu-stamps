import { createClient } from '@supabase/supabase-js';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from "@/constants";
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function GET(request: Request) {
    try {
        // grab cookie and verify it exists
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME);

        if (!token) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const { value } = token;
        const secret = process.env.JWT_SECRET || "";

        // verifying the token
        let payload;
        try {
            payload = verify(value, secret);
        } catch (e) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // get user id and verify it exists
        const user_id = (payload as any).user_id;
        const email = (payload as any).email || 'unknown';

        if (!user_id) {
            return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
        }

        // get data from supabase
        const table = await supabase.from('stamp-card');
        const { data, error } = await table.select('num_stamps').eq('user_id', user_id);
        if (error) { throw new Error(error.message);}

        //check if any stamps do not have exactly 10 stamps
        if ( data.some(stamp => stamp.num_stamps !== 10) ) {
            return NextResponse.json({ message: "You do not have 10 stamps on all cards" }, { status: 409 });
        }

        //create a new stamp card for the user
        const { error: insertError } = await supabase.from("stamp-card").insert({ user_id });

        if (insertError) {
            throw new Error(insertError.message);
        }

        // return success response
        return NextResponse.json({ message: `Stamp card created for user ${email}` }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status : 500})
    }
}