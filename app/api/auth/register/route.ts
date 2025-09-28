import { NextResponse } from "next/server";
import crypto from 'crypto';  // for generating a random token
import { validateEmailPassword, registerUser, updateVerificationCodes, sendVerificationEmail } from '@/app/registerFunctions';


// registers a new user
export async function POST(request: Request) {
    try {
        // receive the email and password of the user
        const { email, password } = await request.json();
        
        // validate the email and password
        const valid = await validateEmailPassword(email, password);
        if (!valid.success) {
            return NextResponse.json({ error: valid.errorMessage }, { status: valid.statusCode });
        }

        // register the user
        const reg = await registerUser(email, password);

        // throw error from inserting into the database
        if (!reg.success) { throw Error(reg.error) };

       return NextResponse.json({message: "success"}, {status: 200});

    // catch any other errors
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
