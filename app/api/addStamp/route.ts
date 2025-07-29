import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

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
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token not found" },
        { status: 401 }
      );
    }
    //verify the JWT
    let user_id: number;
    try {
      const secret = process.env.JWT_SECRET || "";
      const decoded = verify(token, secret) as {
        email: string;
        verification: number;
        id: number;
      };
      user_id = decoded.id;
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    //stamp verification
    const { data: todayStampData, error: stampError } = await supabase
      .from("stamps")
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
    const { stamp }: { stamp: string } = await request.json();

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
      .from("stamp-card")
      .select("*")
      .eq("user_id", user_id)
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
    const { error: updateError } = await supabase
      .from("stamp-card")
      .update({
        stamps: updatedStamps,
        num_stamps: stampCardData.num_stamps + 1,
      })
      .eq("user_id", user_id);

    if (updateError) {
      return NextResponse.json(
        { message: "Failed to update stamp card" },
        { status: 500 }
      );
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