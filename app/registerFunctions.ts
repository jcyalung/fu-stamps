import { createClient } from '@supabase/supabase-js';  // for supabase
import nodemailer from 'nodemailer';  // for sending verification email
import { supabase, supabaseAdmin } from '@/types/supabaseClient';
import crypto from 'crypto';
import Email from '@/components/email';
import { TABLES } from '@/constants';
// Define constants for supabase client and verification link
const VERIFICATION_URL = process.env.VERIFICATION_URL || "http://localhost:3000/verify";


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

    /* 
    registering the user follows:
        try to sign up the user in supabase auth
        then send the verification email
        update the users table with a 0 verification status
`       add the token to the table
    */
    // try to sign up user
    const { data, error } = await supabase.auth.signUp({email, password});
    
    // if unsuccessful, return false
    if (error) {
        return ({ success: false, error: error.message });
    }

    const { data: userData, error: userError } = await supabaseAdmin
                    .from(TABLES.USERS)
                    .insert({
                        auth_id: data.user?.id, 
                        email: email
                    });
    if(userError) {
        return { success: false, error: userError.message};
    }
    
    const token = crypto.randomBytes(32).toString('hex');
    const result = await sendVerificationEmail(email, token);

    if(!result) { return{ success: false, error: 'Verification email was not sent.'}; }

    // update verification codes database
    const expiration = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const { data : verificationData, error: verificationError } = await supabaseAdmin
                    .from(TABLES.VERIFICATION_CODES)
                    .insert({
                        auth_id: data.user?.id, 
                        code: token, 
                        expiration: expiration
                    });

    // if error occurs during verification updates
    if(verificationError) {
        return { success: false, error: verificationError.message }
    }

    return { success: true, data };
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

    const { accepted, rejected } = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Verify your Fu-Stamps Email',
        html: Email(to, EMAIL_LINK),
    });

    if(accepted) { return true; }
    else {
        return false;
    }
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

export async function resendVerificationEmail(old_token : string) {
    // retrieve user auth_id
    const { data: user, error: userError } = await supabaseAdmin
                    .from(TABLES.VERIFICATION_CODES)
                    .select('auth_id')
                    .eq('code', old_token)
                    .single();

    // delete code from table
    const { error: deleteError } = await supabaseAdmin
                    .from(TABLES.VERIFICATION_CODES)
                    .delete({count : 'exact'})
                    .eq('code', old_token);
    
    // align auth_id with email
    const { data, error: emailError } = await supabaseAdmin 
                    .from(TABLES.USERS)
                    .select('email')
                    .eq('auth_id', user!.auth_id)
                    .single();

    const { email } = data!;
    
    // generate new code
    const new_token = crypto.randomBytes(32).toString('hex');
    // update verification codes database
    const expiration = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const { data : verificationData, error: verificationError } = await supabaseAdmin
                    .from(TABLES.VERIFICATION_CODES)
                    .insert({
                        auth_id: user!.auth_id, 
                        code: new_token, 
                        expiration: expiration
                    });
    if (verificationError) {
        console.log(verificationError);
        return false;
    }
    
    const result = await sendVerificationEmail(email, new_token);
    if(result) { return true; }
    else       { return false; }
}