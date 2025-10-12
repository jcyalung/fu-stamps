import { cookies } from 'next/headers';
import { TABLES } from "@/constants";
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: Request) {
    try {
        const cookieStore = (await cookies()) as any;
         const supabase = createRouteHandlerClient({ cookies : () => { return cookieStore }});

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ message: "Forbidden"}, { status: 403 });
        }

        const auth_id = user.id;
        const email = user.email ?? 'unknown';

        const { data: existingCard, error: cardError } = await supabase
          .from(TABLES.STAMPCARDS)
          .select("*")
          .single();
        
        // any stamp cards mean they exist
        // when a user
        if(existingCard) {
            throw new Error("A stamp card already exists for this user!");
        }
        // 6. Insert a new stamp card for the user
        const { error: insertError } = await supabase
          .from(TABLES.STAMPCARDS)
          .insert({auth_id});


        if (insertError) {
            throw new Error(insertError.message);
        }
        
        const { data : card, error: newCardError } = await supabase
          .from(TABLES.STAMPCARDS)
          .select('*')
          .single();
        const { card_id, stamps, num_stamps } = card;
        // return success response
        return NextResponse.json(
          { message: {card_id, stamps , num_stamps} }, 
          { status: 200 });
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status : 500})
    }
}