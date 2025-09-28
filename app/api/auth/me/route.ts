import { cookies } from 'next/headers';            // Next.js helper
import { createSupabaseUserClient } from '@/types/supabaseClient';
import { COOKIE_NAME } from '@/constants';

export async function GET(request: Request) {
  // Read cookies using Next's helper
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!accessToken) {
    return new Response('Not authenticated', { status: 401 });
  }

  // Create a user-scoped supabase client for this request
  const supabaseUser = createSupabaseUserClient(accessToken);

  // Now you can run RLS-checked queries
  const { data: userData, error } = await supabaseUser.auth.getUser();

  if (error) {
    return new Response('Invalid token', { status: 401 });
  }

  return new Response(JSON.stringify(userData), { status: 200 });
}
