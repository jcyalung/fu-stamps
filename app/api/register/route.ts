import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';  // for supabase
import crypto from 'crypto';  // for generating a random token
import nodemailer from 'nodemailer';  // for sending verification email

// Start the supabase client
const supabase = createClient( process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "" );

// registerUser returns if inserting the data was successfull, otherwise includes the error message
async function registerUser(email: string, password: string): Promise<{ success: boolean; data?: any , error?: string }> {
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
                email: email,
                password: password,
                verification: 0,
                date_registered: new Date().toISOString().slice(0,10), // date in form MM-DD-YYYY
            },
        ])
        .select();

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
}


// sendVerificationEmail uses nodemailer to send a verification email to the new user
const VERIFICATION_URL = process.env.VERIFICATION_URL || "http://localhost:3000/verify";
async function sendVerificationEmail(to: string, link: string) {
    const EMAIL_LINK = VERIFICATION_URL + "?code=" + "generated-code-here";

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.TEST_EMAIL,
            pass: process.env.TEST_PASSWORD,
        },
    });
  
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Verify your email',
        html: `<p>Click <a href="${EMAIL_LINK}">here</a> to verify your email.</p>`,
    });
}


// updateVerificationCodes updates with new user data in verification_codes table
async function updateVerificationCodes(user_id: number, code: string, experiation_date: string): Promise<{ success: boolean; error?: string }> {
    const { data, error } = await supabase
        .from('verification-codes')
        .insert([
            {
                user_id: user_id,
                code: code,
                expires: experiation_date,
            },
        ])
        .select();
  
    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
}


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
        const isUnicode = /[^\u0021-\u007e]+$/;
        const hasWhitespace = /\s/;
        if (password === "" || hasWhitespace.test(password) || isUnicode.test(password)) {
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
                
        // Create verification token & expiration
        const token = crypto.randomBytes(32).toString('hex');

        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
        await sendVerificationEmail(email, verificationUrl);

        // Send success response
        if (reg.success) {
            return NextResponse.json({ message: `Verification email was sent to: ${email}` } , { status: 200 });
        }

        // Update verification_codes table
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(); // 24 hours after current date
        const verify_codes = await updateVerificationCodes(reg.data.user_id, token, expires);

        // Throw error if the verification code couldn't be inserted into the table
        if (!verify_codes.success) { throw Error(`Unable to insert verification code`) };

    // Catch any other errors
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}
