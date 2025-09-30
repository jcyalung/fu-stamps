import { NextRequest, NextResponse } from "next/server";
import { createSupabaseUserClient, supabaseAdmin } from "@/types/supabaseClient";
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

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if(!token) {
      throw Error('Unable to verify user');
    }

    const supabaseUser = createSupabaseUserClient(token);

    const { data : user, error : userError } = await supabaseUser.from(TABLES.USERS).select().single();;
    console.log(user);
    const currentDate = new Date().toISOString().slice(0, 10);

    // Check if a stamp already exists for today
    const { data: existingStamp, error: checkError } = await supabaseAdmin
      .from("stamps")
      .select("id")
      .filter('created_at::date', 'eq', currentDate)
      .single();

      // if no existing stamp  is found
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
      .from("stamps")
      .insert([{ word: stamp}]);//handles the time 

    if (insertError) {
      throw new Error(insertError.message);
    }

    return NextResponse.json(
      { message: `Stamp added: ${stamp}, ${currentDate}` },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error : error.message }, { status: 500 });
  }
}
