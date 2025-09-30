import { NextResponse } from "next/server";
import { supabase } from "@/types/supabaseClient";
import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";
import { createRouteHandlerClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export async function GET() {

  // we use route handler client to remove the cookies required

  // enforce any type so typescript doesnt scream
  const cookieStore = (await cookies()) as any;
  const supabase = createRouteHandlerClient({cookies : () => cookieStore});
  const supabaseUser = createClientComponentClient();

  // connect to DB to sign out current user
  try {
    const { error } = await supabase.auth.signOut();
    const { error: localStorageError } = await supabaseUser.auth.signOut();
    // if error occurs
    if (error) {throw Error(error.message); }
    else { 
      // otherwise return successful
      return NextResponse.json({message: "logged out successfully"}, {status:200});
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 }
    );
  }
}
