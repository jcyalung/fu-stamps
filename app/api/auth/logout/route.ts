import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
export async function GET() {

  // enforce any type so typescript doesnt scream
  const cookieStore = (await cookies()) as any;
  const supabase = createRouteHandlerClient({cookies : () => cookieStore});

  // connect to DB to sign out current user
  try {

    const { error } = await supabase.auth.signOut();

    // if error occurs
    if (error) {throw Error(error?.message); }
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
