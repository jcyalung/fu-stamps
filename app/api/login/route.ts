import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import { sign } from "jsonwebtoken";
const { createClient } = require('@supabase/supabase-js');

const MAX_AGE = 60*60*24*7; // max age set for 7 days

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export async function POST(request: Request) {
    try {
        // getting the request body and storing the values in variables
        const { email, password, verification, user_id } = await request.json();

        //regex for email validation
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|edu|gov)$/;

        //regex for password validation
        // [\x00-\x7F] only ascii characters
        // + ensures one character
        const passRegex = /^[\x00-\x7F]+$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Email format invalid" }, { status: 400 });
        }

        if (!passRegex.test(password) || password.length < 1) {
            return NextResponse.json({ message: "Password format invalid" }, { status: 400 });
        }

        // sample data login
        // if ( email !== "admin@gmail.com" ) {
        //     return NextResponse.json({ message: "Invalid email" }, { status: 404 });
        // }
        // else if ( password !== "password" ) {
        //     return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        // }
        // else if ( verification !== 2 ) {
        //     return NextResponse.json({ message: "User is not verified" }, { status: 500 });
        // }
        
        //querying the database to check if the user exists
        try {
            const table = await supabase.from('users');
            const { data, status, error } = await table.select('email, password, verification').eq('email', email);
            if(error) { throw Error(error.message); }
            // check if exactly one email is found
            if ( data.length !== 1 ) {
                return NextResponse.json({ message: "Email not found" }, { status: 404 });
            }
            // check if the user is verified
            if ( data[0].verification == 0 ) {
                return NextResponse.json({ message: "User is not verified" }, { status: 403 });
            }
            // check if the password matches
            if ( data[0].password !== password ) {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 });
            }
        } catch(error) {
            //any unknown error
            return NextResponse.json({ message: "Error:" }, { status: 500 });
        }
        
        const secret = process.env.JWT_SECRET || "";

        // generate json web token signed by secret
        const token = sign(
            { email, user_id },
            secret,
            { expiresIn: MAX_AGE }
        );

        const serialized = serialize("token", token, {
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