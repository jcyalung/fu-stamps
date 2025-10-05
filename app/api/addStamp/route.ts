import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, TABLES } from "@/constants";
import { verify } from "jsonwebtoken";
import { supabase, supabaseAdmin } from "@/types/supabaseClient";
import { cookies } from "next/headers";

/**
 * This is an endpoint for adding a new stamp to a stampcard
 *
 * Returns:
 * 400, the user does not have a stamp card
 * 401, the user has already stamped their card for the day
 * 403, the stamp is incorrect
 * 404, there was no stamp for that day
 * 409, there are already 10 stamps on the card
 * 500, any unknown error with database interaction
 */
export async function POST(request: NextRequest) {
  try {
    const {
      data : {session}
    } = await supabase.auth.getSession();

    if(!session) {
      return NextResponse.json(
        { message: "Authentication token not found" },
        { status: 401 }
      );
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    //stamp verification
    const { data: todayStampData, error: stampError } = await supabase
      .from(TABLES.STAMPS)
      .select("word")
      .eq("created_at", currentDate)
      .single();

    if (stampError || !todayStampData) {
      return NextResponse.json(
        { message: "There is no stamp for that day" },
        { status: 404 }
      );
    }

    const todayStampWord = todayStampData.word;
    const { stamp } : { stamp: string } = await request.json();

    if (!stamp) {
      return NextResponse.json(
        { message: "Stamp parameter is required" },
        { status: 400 }
      );
    }
    if (stamp != todayStampWord) {
      return NextResponse.json(
        { message: "Stamp is incorrect" },
        { status: 403 }
      );
    }

    // Get user's stamp card
    const { data: stampCardData, error: cardError } = await supabase
      .from(TABLES.STAMPCARDS)
      .select("*")
      .eq("auth_id", session.user.id)
      .single();

    if (cardError || !stampCardData) {
      return NextResponse.json(
        { message: "The user does not have a stamp card" },
        { status: 400 }
      );
    }

    const existingStamps = stampCardData.stamps || {};

    if (existingStamps[todayStampWord]) {
      return NextResponse.json(
        { message: "User has already stamped their card for the day" },
        { status: 401 }
      );
    }

    // Check if stamp card is full (10 stamps max)
    if (stampCardData.num_stamps >= 10) {
      return NextResponse.json(
        { message: "There are already 10 stamps on the card" },
        { status: 409 }
      );
    }

    //adds new stamp to the stamps json
    const updatedStamps = {
      ...existingStamps,
      [todayStampWord]: currentDate,
    };

    //update the stamp in the database
    const { data : card, error: updateError } = await supabase
      .from(TABLES.STAMPCARDS)
      .update({
        stamps: updatedStamps,
        num_stamps: stampCardData.num_stamps + 1,
      })
      .eq("auth_id", session.user.id);

    if (updateError) {
      return NextResponse.json(
        { message: "Failed to update stamp card" },
        { status: 500 }
      );
    }

    // if update success, add a row to the stamp_log
    const { error : logError } = await supabaseAdmin
      .from(TABLES.LOG)
      .insert({ auth_id : session.user.id });

    if (logError) {
      throw Error(logError.code);
    }
    
    // Return success message
    return NextResponse.json(
      { message: "Stamp added to stamp card" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
