import { supabaseAdmin } from '@/types/supabaseClient';
import { TABLES } from '@/constants';
/**
 * we must check if the verification code if it exists in the database, then verify the user associated with the verification code
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
  // we need supabase admin to verify verification codes, considering user is not logged in
  
  try {
    const { verification_code } = await request.json();
    //checks if there is no verification code
    if (!verification_code) {
      return new Response(
        JSON.stringify({ error: 'Server error: Missing verification code' }), {status: 500}
      );
    }

    // checks if verification code exists
    const { data: codeEntry, error: codeError } = await supabaseAdmin
      .from(TABLES.VERIFICATION_CODES)
      .select('*')
      .eq('code', verification_code)
      .single();

     
    // throw error if no verification code was found
    if (codeError) { throw Error(codeError.code); }

    // delete code bc we dont need it before
    const { error: deletedError } = await supabaseAdmin
      .from('verificationcodes')
      .delete()
      .eq('code', codeEntry.code);
    
    if ( deletedError ) { throw Error(deletedError.code); }
    // checks if code expired
    const expiry = new Date(codeEntry.expiration).toISOString().slice(0,10);
    const current = new Date().toISOString().slice(0,10);
    if (expiry < current) {
      return new Response(
        JSON.stringify({ error: 'Verification code expired' }), {status: 401}
      );
    }

    // updates user verification status
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ verification: 1 })
      .eq('auth_id', codeEntry.auth_id)
      .select('email')
      .single();

    // checks if the verification status is valid (error handling)
    if (updateError || !updatedUser) {
      return new Response(
        JSON.stringify({ error: 'Database error: Failed to update user' }), {status: 500}
      );
    }
    
    // success responses
    return new Response(
      JSON.stringify({message: 
        `Verified user ${updatedUser.email}!`
      }), {status: 200}
    );
    
  } catch (err : any) {
    return new Response(
      JSON.stringify({error: err.message}), {status: 500}
    );
  }
}