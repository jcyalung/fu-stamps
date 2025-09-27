import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/components/supabaseClient';

// header function
export async function POST(request: Request) {
  try {
    const { verification_code } = await request.json();

    //checks if there is no verification code
    if (!verification_code) {
      return new Response(
        JSON.stringify({ error: 'Server error: Missing verification code' }), {status: 500}
      );
    }

    // checks if verification code exists
    const { data: codeEntry, error: codeError } = await supabase
      .from('verification-codes')
      .select('*')
      .eq('code', verification_code)
      .single();

    if (codeError || !codeEntry) {
      return new Response(
        JSON.stringify({ error: 'Verification code not found' }), {status: 404}
      );
    }

    // checks if code expired
    const expiry = new Date(codeEntry.expires).toISOString().slice(0,10);
    const current = new Date().toISOString().slice(0,10);

    if (expiry < current) {
      return new Response(
        JSON.stringify({ error: 'Verification code expired' }), {status: 401}
      );
    }

    // updates user verification status
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ verification: 1 })
      .eq('id', codeEntry.user_id)
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
      JSON.stringify({message: `Verified user ${updatedUser.email}!`}), {status: 200}
    );
  } catch (err : any) {
    return new Response(
      JSON.stringify({error: err}), {status: 500}
    );
  }
}