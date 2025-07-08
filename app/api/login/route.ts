import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import { sign } from "jsonwebtoken";

const MAX_AGE = 60*60*24*7; // max age set for 7 days

export async function POST(request: Request) {
    // getting the request body and storing the values in variables
    const { email, password, verification, user_id } = await request.json();

    //regex for email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegex.test(email)) {
        return NextResponse.json({ message: "Invalid email" }, { status: 500 });
    }

    // sample data login
    if ( email !== "admin@gmail.com" ) {
        return NextResponse.json({ message: "Invalid email" }, { status: 404 });
    }
    else if ( password !== "password" ) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }
    else if ( verification !== 2 ) {
        return NextResponse.json({ message: "User is not verified" }, { status: 500 });
    }
    
    const secret = process.env.JWT_SECRET || "";

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
        message: "Login successful",
    }

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "Set-Cookie": serialized,
        },
    });
}