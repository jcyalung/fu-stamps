import { createClient } from '@supabase/supabase-js';  // for supabase
import nodemailer from 'nodemailer';  // for sending verification email
import { supabase, supabaseAdmin } from '@/types/supabaseClient';

// Define constants for supabase client and verification link
const VERIFICATION_URL = process.env.VERIFICATION_URL || "http://localhost:3000/verify-email";


// Checks if the email and password are valid and returns appropiate error message and status codes accordingly
export async function validateEmailPassword(email: string, password: string): Promise<{ success: boolean; errorMessage?: string; statusCode?: number }> {
    // Check valid email format using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
        return { success: false, errorMessage: "Invalid email format" , statusCode: 400};
    }

    // Check if email is UCI affiliated
    if (!email.endsWith("@uci.edu")) {
        return { success: false, errorMessage: "Not a UCI affiliated email" , statusCode: 400};
    }

    // Check password (no blank password, only ascii chars, no whitespace)
    const isASCII = /[^\u0021-\u007e]+$/;
    const hasWhitespace = /\s/;
    if (password === "" || hasWhitespace.test(password) || isASCII.test(password)) {
        return { success: false, errorMessage: "Invalid password" , statusCode: 400};
    }

    // Check duplicate emails
    const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

    // Throw error from querying database for copies
    if (error) { 
        return { success: false, errorMessage: error.message , statusCode: 500};
    }

    // If there is matching data, the email already exists and won't registered
    if (data) {
        return { success: false, errorMessage: `User with email ${email} already exists` , statusCode: 409};
    }
    
    return { success: true }
}


// registerUser returns if inserting the data was successfull, otherwise includes the error message
export async function registerUser(email: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> {
    const { data, error } = await supabase.auth.signUp({email, password});
    if (error) {
      return { success: false, error: error.message }
    }
    if (data) {
        console.log(data.user!.id);
        const result = await supabaseAdmin.from('users').insert({
            auth_id: data.user!.id, // Supabase UUID
            email: data.user!.email,
            verification: 0, // optional, if you want your own tracking
        });
        console.log(result);
    }
    

    return { success: true, data }
}


// sendVerificationEmail uses nodemailer to send a verification email to the new user
export async function sendVerificationEmail(to: string, token: string) {
    // Hardcoded email link and verification url
    const EMAIL_LINK = VERIFICATION_URL + "?token=" + token;

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
        html: `<p>Thank you for registering for Fu-Stamps! Click <a href="${EMAIL_LINK}">here</a> to verify your email.</p>`,
    });
}


// updateVerificationCodes updates with new user data in verification_codes table
export async function updateVerificationCodes(user_id: number, code: string, experiation_date: string): Promise<{ success: boolean; error?: string }> {
    const { data, error } = await supabaseAdmin
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
