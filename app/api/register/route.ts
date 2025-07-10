import { NextResponse } from "next/server";
// for sending an email verification message
// import crypto from 'crypto';
// import { sendVerificationEmail } from '@/app/lib/sendEmail';

export async function POST(request: Request) {
    try {
        // Recieve the email and password of the user
        const { email, password } = await request.json();

        // Check valid email format using regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Check if email is UCI affiliated
        if (!email.endsWith("@uci.edu")) {
            return NextResponse.json({ error: "Not a UCI affiliated email" }, { status: 400 });
        }

        // Send Verification Email: (use verification-email example?)
        // Create verification token & expiration
        // const token = crypto.randomBytes(32).toString('hex');
        // const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
        // from sendEmail
        // await sendVerificationEmail(email, verificationUrl);

        // Send Success Response
        return NextResponse.json({ message: "Verification email was sent.", email, password } , { status: 200 });
    
    // Catch any other errors
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while registering." }, { status: 500 });
    }
    
}
