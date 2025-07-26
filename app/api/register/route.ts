import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';  // for supabase
import crypto from 'crypto';  // for generating a random token
import { registerUser, updateVerificationCodes, sendVerificationEmail } from '@/app/registerFunctions;

// Define constants for supabase client and verification link
const supabase = createClient( process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "" );


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

        // Check password (no blank password, only ascii chars, no whitespace)
        const isASCII = /[^\u0021-\u007e]+$/;
        const hasWhitespace = /\s/;
        if (password === "" || hasWhitespace.test(password) || isASCII.test(password)) {
            return NextResponse.json({ error: "Invalid password" }, { status : 400 });
        }

        // Check duplicate emails
        const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .maybeSingle();

        // Throw error from querying database for copies
        if (error) { throw Error(error.message) }

        // If there is matching data, the email already exists and won't registered
        if (data) {
            return NextResponse.json({ error: `User with email ${email} already exists` }, { status : 409 });
        }

        // Register the user
        const reg = await registerUser(email, password);

        // Throw error from inserting into the database
        if (!reg.success) { throw Error(reg.error) };

        // Set up verification token, experiation, and user
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(); // 24 hours after current date
        const user = reg.data?.[0];

        // Update verification_codes table
        const verify_codes = await updateVerificationCodes(user.id, token, expires);
        if (!verify_codes.success) { throw Error(`Unable to insert verification code`) };

        // Send the verification email with the token
        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
        await sendVerificationEmail(email, verificationUrl);

        // Send success response
        if (reg.success) {
            return NextResponse.json({ message: `Verification email was sent to: ${email}` } , { status: 200 });
        }

    // Catch any other errors
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
