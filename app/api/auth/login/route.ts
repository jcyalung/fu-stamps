import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
export async function POST(request: Request) {
    try {
        const cookieStore = (await cookies()) as any; // trust me typescript its fine
        const supabase = createRouteHandlerClient({ cookies : () => cookieStore });
        // receive email and password
        const { email, password } = await request.json();

        // use supabase authorization to log in 
        const { data, error } = await supabase.auth.signInWithPassword({
            email, 
            password
        });
        
        if(error) {
            console.log(error);
            return NextResponse.json({message: "Unable to log you in"}, {status: 500})
        }
        else {
            return NextResponse.json(
                { user: data.user },
                { status: 200 }
            );
        }
    } catch (error : any) {
        console.log(error.message);
        return NextResponse.json({error:error.message}, {status:500});
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
    */
}