import { createClient } from '@supabase/supabase-js';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from "@/constants";
import { NextResponse } from 'next/server';
import { createSupabaseUserClient, supabase } from '@/types/supabaseClient';

export async function GET(request: Request) {
    try {
        // grab cookie and verify it exists
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME)?.value;

        if (!token) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const supabaseUser = createSupabaseUserClient(token);

        const {
          data: { user },
          error: userError,
        } = await supabaseUser.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ message: "Forbidden"}, { status: 403 });
        }

        const user_id = user.id;
        const email = user.email ?? 'unknown';

        const { data, error } = await supabaseUser
            .from('stamp-card')
            .select('num_stamps')
            .eq('user_id', user_id);
        
        if (error) { throw new Error(error.message);}

        //check if any stamps do not have exactly 10 stamps
        if ( data.some(stamp => stamp.num_stamps !== 10) ) {
            return NextResponse.json({ message: "You do not have 10 stamps on all cards" }, { status: 409 });
        }

         // 6. Insert a new stamp card for the user
        const { error: insertError } = await supabaseUser
          .from('stamp-card')
          .insert({ user_id });


        if (insertError) {
            throw new Error(insertError.message);
        }

        // return success response
        return NextResponse.json({ message: `Stamp card created for user ${email}` }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status : 500})
    }
}