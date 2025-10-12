import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TABLES } from '@/constants';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import crypto from 'crypto';
export async function GET(request: Request) {
  try {
    // parses cookies
    const cookieStore = (await cookies()) as any;
    const supabase = createRouteHandlerClient({ cookies : () => cookieStore });

    const {
      data : { user },
      error : userError
    } = await supabase.auth.getUser();
    
    // error handling if user is not found
    if (userError || !user) {
      return NextResponse.json({
        status_code: 400,
        error: 'User not found',
        user: {}
      }, { status: 400 });
    }

    // retrieves stamp cards with num_stamps value of 10
    const { data: stampCard, error: stampCardError } = await supabase
      .from(TABLES.STAMPCARDS)
      .select('*')
      .single();

    /// no stamp cards
    if (stampCardError) {
      return NextResponse.json({
        status_code: 500,
        error: 'Failed to fetch stamp cards',
        user: {}
      }, { status: 500 });
    } 

    if (stampCard.num_stamps < 10) {
      return NextResponse.json({
        status_code: 400,
        error: 'No stamp cards follow the criteria',
      }, { status: 400 });
    }

    // deletes the most recent valid card
    const { error: deleteError } = await supabase
      .from(TABLES.STAMPCARDS)
      .delete()
      .eq('card_id', stampCard.card_id);

    if (deleteError) {
      console.log(deleteError);
      return NextResponse.json({
        status_code: 500,
        error: 'Failed to delete stamp card',
      }, { status: 500 });
    }
    const code = crypto.randomBytes(32).toString('hex');
    const auth_id  = user.id;
    let expiration = new Date(); 
    expiration.setDate(expiration.getDate() + 30);
    const { data : reward, error : rewardError } = await supabase
      .from(TABLES.REWARDS)
      .insert({auth_id, expiration, code});
    if(rewardError) {
      console.log(rewardError);
      return NextResponse.json({
        error: 'Failed to add reward',
      }, { status: 500});
    }
    return NextResponse.json({ success: 'Successfully deleted stamp card and reward added' }, { status: 200 });

  } catch (err : any) {
    return NextResponse.json({
      status_code: 500,
      error: 'Internal server error',
    }, { status: 500 });
  }
}