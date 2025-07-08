import { NextRequest, NextResponse } from "next/server";

/**
 * This is an endpoint for the Academic Directors to set a stamp
 * Sets the stamp of the day based on the 'stamp' parameter.
 * Returns 200 with the stamp word and current date if valid.
 * Returns 400 if the stamp is missing or invalid.
 */
export async function GET(req: NextRequest) {
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

  if (isValid) {
    const currentDate = new Date().toISOString().slice(0, 10); //this is a way to get the date with the "2025-07-08" format
    return NextResponse.json({ word: stamp, currentDate }, { status: 200 }); //returns the word and the Date if valid
  } else {
    return NextResponse.json(
      { error: "Invalid stamp format" },
      { status: 400 } //returns error code 400 if invalid
    );
  }
}
