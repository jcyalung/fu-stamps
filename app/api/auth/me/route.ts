import { cookies } from 'next/headers';            // Next.js helper
import { COOKIE_NAME, TABLES } from '@/constants';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = await cookieStore.get(COOKIE_NAME);
  console.log(token);
  if(!token) {
    return new Response(JSON.stringify({message: 'error'}), { status: 401 });
  }
  
   //const { data: userData, error: userError } = await supabase
   //    .from(TABLES.USERS)
   //    .select('verification')
   //    .eq('auth_id', session.user.id) // auth_id = Supabase user UUID
   //    .single();
   //if (userError) {
   //  return new Response('Invalid token', { status: 401 });
   //}
   //const verification = userData?.verification;
  return new Response(JSON.stringify({message:'soemthing'}), { status: 200 });
}
