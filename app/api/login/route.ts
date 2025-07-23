import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import { sign } from "jsonwebtoken";
import { createClient } from '@supabase/supabase-js';
import { COOKIE_NAME } from '@/constants';
const MAX_AGE = 60*60*24*7; // max age set for 7 days

const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
);

export async function POST(request: Request) {
    try {
        // getting the request body and storing the values in variables
        const { email, password } = await request.json();

        //regex for email validation
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|edu|gov)$/;

        //regex for password validation
        // [\x00-\x7F] only ascii characters
        // + ensures one character
        const passRegex = /^[\x21-\x7E]+$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Email format invalid" }, { status: 400 });
        }

        if (!passRegex.test(password) || password.length < 1) {
            return NextResponse.json({ message: "Password format invalid" }, { status: 400 });
        }
        
        //querying the database to check if the user exists
        const table = await supabase.from('users');
        const { data, error } = await table.select('email, password, verification, id').eq('email', email);
        if(error) { throw Error(error.message); }

        const user = data?.[0] || null;

        if(!user) {
            return NextResponse.json({ message: "Account does not exist"}, { status: 404});
        }

        // otherwise we will store the user's verification and id
        const { verification, id } = user!; // the ! operator bypasses typescript errors

        // check if the user is verified
        if ( user!.verification == 0 ) {
            return NextResponse.json({ message: "User is not verified" }, { status: 403 });
        }
        // check if the password matches
        if ( user!.password !== password ) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }
        
        const secret = process.env.JWT_SECRET || "";

        // generate json web token signed by secret
        const token = sign(
            // we need to pass their verification status 
            { email, verification, id },
            secret,
            { expiresIn: MAX_AGE }
        );

        const serialized = serialize(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: MAX_AGE,
            path: "/",
        });

        const response = {
            message: `Successfully logged in ${email}`,
        }

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                "Set-Cookie": serialized,
            },
        });
    }
    catch (error: any) {
        return NextResponse.json({message: error.message}, {status : 500})
    }
}