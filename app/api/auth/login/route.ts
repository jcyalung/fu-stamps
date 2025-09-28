import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import { COOKIE_NAME, MAX_AGE } from '@/constants';
import { supabase } from '@/types/supabaseClient';


export async function POST(request: Request) {
    try {
        // receive email and password
        const { email, password } = await request.json();

        // use supabase authorization to log in 
        const { data, error } = await supabase.auth.signInWithPassword({email, password});
        if(error) {
            console.log(error);
            return NextResponse.json({error: "Unable to log you in"}, {status: 500})
        }
        else {
            // no need to check verification because row is already stored
            const res = NextResponse.json({ success: true }, { status: 200 });
            res.cookies.set('sb-access-token', data.session.access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: MAX_AGE,
            });
            return res;
        }
    } catch (error : any) {
        return NextResponse.json({error:"an unknown error occurred"}, {status:500});
    }
    /* try {
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
    } */
}