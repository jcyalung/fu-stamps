import { TABLES } from "@/constants";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        const cookieStore = (await cookies()) as any;
        const supabase = createRouteHandlerClient({cookies : () => cookieStore});
        const {
            data:   { user },
            error : userError
        } = await supabase.auth.getUser();

        if(userError || !user) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // should only be able to collect their own stampcard
        const { data: existingCard, error: cardError } = await supabase
                .from(TABLES.STAMPCARDS)
                .select('stamps')
                .single();

        if(cardError) {
            return NextResponse.json({ message: "User has no stamp card" }, {status: 404});
        }
        const { stamps } = existingCard;
        
        return NextResponse.json({message: stamps}, {status: 200});
    } catch(error: any) {
        return NextResponse.json({message: error.message}, {status : 500});
    }
}