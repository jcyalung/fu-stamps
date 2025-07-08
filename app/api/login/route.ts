import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Recieve the email and password of the user
        const { email, password } = await request.json();

        // Check valid email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Check if email is UCI affiliated
        if (!email.endsWith("@uci.edu")) {
            return NextResponse.json({ error: "Not a UCI affiliated email" }, { status: 400 });
        }

        // Send Verification Email
            // Create verification token & expiration
            // use sendVerificationEmail example?


        // Send Success Response
        return NextResponse.json({ message: "Verification email was sent.", email, password } , { status: 200 });
    
    // Catch any other errors
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while registering." }, { status: 500 });
    }
    
}
