import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/types/supabaseClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { COOKIE_NAME, TABLES } from "@/constants";
/**
 * This is an endpoint for the Academic Directors to set a stamp
 * Sets the stamp of the day based on the 'stamp' parameter.
 *
 * Returns:
 * 200 with the stamp word and current date if valid.
 * 400 if the stamp is missing or invalid.
 * 409 if a word already exists for the day
 * 500 for database errors
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url); //creates a new URL object from the incoming HTTP request
    const raw_stamp = url.searchParams.get("stamp"); //gets the parameter named stamp
    
    if (!raw_stamp) {
      //if the extracted stamp is null
      return NextResponse.json(
        { error: "Missing stamp parameter" },
        { status: 400 }
      );
    }

    const stamp = raw_stamp.toLowerCase();
    const isValid = /^[a-z]+$/.test(stamp); //checking if the stamp is a valid word

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid stamp format" },
        { status: 400 }
      );
    }
    const cookieStore = (await cookies()) as any;
    const supabase = createRouteHandlerClient({ cookies : () => cookieStore });
    // retrieve token and check if user is an academics director
    const {
      data : { session },
      error : userError
    } = await supabase.auth.getSession();
    if(userError) {
      console.log(userError);
    }
    const currentDate = new Date().toISOString().slice(0, 10);

    // Check if a stamp already exists for today
    const { data: existingStamp, error: checkError } = await supabaseAdmin
      .from(TABLES.STAMPS)
      .select("id")
      .filter('created_at::date', 'eq', currentDate)
      .single();

      // if no existing stamp is found
    if (checkError && checkError.code !== "PGRST116") {
      throw new Error(checkError.message);
    }

    if (existingStamp) {
      return NextResponse.json(
        { error: "A word already exists for the day" },
        { status: 409 }
      );
    }

    const { error: insertError } = await supabaseAdmin
      .from(TABLES.STAMPS)
      .insert([{ auth_id: session?.user.id, word: stamp}]);//handles the time 

    if (insertError) {
      throw new Error(insertError.message);
    }

    return NextResponse.json(
      { message: `Stamp added: ${stamp}, ${currentDate}` },
      { status: 200 }
    );
  } catch (error: any) {
    //console.log(error);
    return NextResponse.json({ error : error.message }, { status: 500 });
  }
}
