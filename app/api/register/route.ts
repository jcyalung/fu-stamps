import { NextResponse } from "next/server";
import crypto from 'crypto';  // for generating a random token
import { validateEmailPassword, registerUser, updateVerificationCodes, sendVerificationEmail } from '@/app/registerFunctions;


// Registers a new user
export async function POST(request: Request) {
    try {
        // Recieve the email and password of the user
        const { email, password } = await request.json();

        // Validate the email and password
        const valid = await validateEmailPassword(email, password);
        if (!valid.success) {
            return NextResponse.json({ error: valid.errorMessage }, { status: valid.statusCode });
        }

        // Register the user
        const reg = await registerUser(email, password);

        // Throw error from inserting into the database
        if (!reg.success) { throw Error(reg.error) };

        // Set up verification token, experiation, and user
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(); // 24 hours after current date
        const user = reg.data?.[0];

        // Update verification_codes table
        const verify_codes = await updateVerificationCodes(user.id, token, expires);
        if (!verify_codes.success) { throw Error(`Unable to insert verification code`) };

        // Send the verification email with the token
        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
        await sendVerificationEmail(email, verificationUrl);

        // Send success response
        if (reg.success) {
            return NextResponse.json({ message: `Verification email was sent to: ${email}` } , { status: 200 });
        }

    // Catch any other errors
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
