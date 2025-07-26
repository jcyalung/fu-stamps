// import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';  // for supabase
import nodemailer from 'nodemailer';  // for sending verification email


// Define constants for supabase client and verification link
const supabase = createClient( process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "" );
const VERIFICATION_URL = process.env.VERIFICATION_URL || "http://localhost:3000/verify";


// registerUser returns if inserting the data was successfull, otherwise includes the error message
export async function registerUser(email: string, password: string): Promise<{ success: boolean; data?: any , error?: string }> {
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
export async function sendVerificationEmail(to: string, link: string) {
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
export async function updateVerificationCodes(user_id: number, code: string, experiation_date: string): Promise<{ success: boolean; error?: string }> {
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
