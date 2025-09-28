import { createClient } from '@supabase/supabase-js';
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/constants';
import { createSupabaseUserClient } from '@/types/supabaseClient';

export async function POST(request: Request) {
  try {
    // parses cookies
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({
        status_code: 400,
        error: 'No session found',
        user: {}
      }, { status: 400 });
    }

    const supabaseUser = createSupabaseUserClient(token);
    // checks if the user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user_id)
      .single();

    // error handling if user is not found
    if (userError || !user) {
      return NextResponse.json({
        status_code: 400,
        error: 'User not found',
        user: {}
      }, { status: 400 });
    }

    // retrieves stamp cards with num_stamps value of 10
    const { data: stampCards, error: stampCardError } = await supabase
      .from('stamp_card')
      .select('id, stamps, created_at')
      .eq('user_id', user_id)
      .eq('num_stamps', 10)
      .order('created_at', { ascending: false });

    if (stampCardError) {
      return NextResponse.json({
        status_code: 500,
        error: 'Failed to fetch stamp cards',
        user: {}
      }, { status: 500 });
    } // REMOVED the extra closing brace here

    // finds cards where stamp length is 10
    const validCard = stampCards?.find(
      card => Array.isArray(card.stamps) && card.stamps.length === 10
    );

    if (!validCard) {
      return NextResponse.json({
        status_code: 400,
        error: 'No stamp cards follow the criteria',
        user: {}
      }, { status: 400 });
    }

    // deletes the most recent valid card
    const { error: deleteError } = await supabase
      .from('stamp_card')
      .delete()
      .eq('id', validCard.id);

    if (deleteError) {
      return NextResponse.json({
        status_code: 500,
        error: 'Failed to delete stamp card',
        user: {}
      }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    return NextResponse.json({
      status_code: 500,
      error: 'Internal server error',
      user: {}
    }, { status: 500 });
  }
}