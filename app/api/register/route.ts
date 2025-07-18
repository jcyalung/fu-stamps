import { NextResponse } from "next/server";
// for sending an email verification message
// import crypto from 'crypto';
// import { sendVerificationEmail } from '@/app/lib/sendEmail';

export async function POST(request: Request) {
    try {
        // Recieve the email and password of the user
        const { email, password } = await request.json();

        // Check valid email format using regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Check if email is UCI affiliated
        if (!email.endsWith("@uci.edu")) {
            return NextResponse.json({ error: "Not a UCI affiliated email" }, { status: 400 });
        }

        // Check password (no empty password, only unicode chars, no whitespace)
        const isUnicode = /[^\u0000-\u00ff]/;
        const hasWhitespace = /\s/;
        if (password === "" || hasWhitespace.test(password) || !isUnicode.test(password)) {
            return NextResponse.json({ error: "Invalid password" }, { status : 400 });
        }

        // check duplicate emails
        // 409 user with email already exists !! use query option to look through emails
        
        // try:
        // Update the users table in the database:
        // id (automatic), email, password, verification (initial: 0), date_registered (2025-07-13)
        
        // catch
        // 500 other unknown database error
        
        // Send Success Response
        return NextResponse.json({ message: "Verification email was sent.", email, password } , { status: 200 });
    
        // Part 3
        // Send Verification Email: (use verification-email example?)
        // Create verification token & expiration
        // const token = crypto.randomBytes(32).toString('hex');
        // const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
        // from sendEmail
        // await sendVerificationEmail(email, verificationUrl);
        
    // Catch any other errors
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while registering." }, { status: 500 });
    }
    
}
