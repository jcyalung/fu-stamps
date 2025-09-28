import { NextResponse } from "next/server";
import { supabase } from "@/types/supabaseClient";
import { COOKIE_NAME } from "@/constants";

export async function GET() {

  // connect to DB to sign out current user
  try {
    const { error } = await supabase.auth.signOut();

    // if error occurs
    if (error) {throw Error(error.message); }
    else { 
      // otherwise return successful
      const res = NextResponse.json({message: "logged out successfully"}, {status:200}); 
      res.cookies.set(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: -1,
      })
      return res;
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 }
    );
  }
}
