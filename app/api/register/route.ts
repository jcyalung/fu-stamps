import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
// for sending an email verification message
// import crypto from 'crypto';
// import { sendVerificationEmail } from '@/app/lib/sendEmail';

// Start the supabase client
const supabase = createClient( process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Function returns if inserting the data was successfull, otherwise includes the error message
export async function registerUser( email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
                email: email,
                password: password,
                verified: false,
                date_registered: new Date().toISOString().slice(0,10),
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
        const isUnicode = /[^\u0000-\u00ff]/;
        const hasWhitespace = /\s/;
        if (password === "" || hasWhitespace.test(password) || !isUnicode.test(password)) {
            return NextResponse.json({ error: "Invalid password" }, { status : 400 });
        }

        // Check duplicate emails
        const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .maybeSingle();
        
        // Catch error from querying database
        if (error) { throw Error(error.message) }
        
        // If there is matching data, the email already exists and won't registered
        if (data) {
            return NextResponse.json({ error: `User with email ${email} already exists` }, { status : 409 });
        }
        
        // Register the user
        const reg = await registerUser(email, password);
        
        // Catch error from inserting into the database
        if (!reg.success) { throw Error(reg.error) }
        
        // Send Success Response
        if (reg.success) {
            return NextResponse.json({ message: `Verification email was sent to: ${email}` } , { status: 200 });
        }

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
