import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const COOKIE_NAME = "SiteSessionJWT";
const secret = process.env.JWT_SECRET as string;

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No session is available" },
        { status: 400 }
      );
    }

    let email = "user";//fallback

    try {
      const decoded: any = verify(token, secret);
      email = decoded.email;
    } catch (err) {
      return NextResponse.json(
        { error: "No session is available" },
        { status: 400 }
      );
    }
    //create a response for successfull logout
    const response = NextResponse.json(
      { message: `Successfully logged out ${email}` },
      { status: 200 }
    );
    //set the cookies maxAge to -1 for logging out
    response.cookies.set({
        name: COOKIE_NAME,
        value: "",
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", 
        maxAge: -1,
        path: "/",  
});

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 }
    );
  }
}
