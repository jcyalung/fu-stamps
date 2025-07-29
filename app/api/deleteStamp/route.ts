import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // parses cookies
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.SiteSessionJWT;

    if (!token) {
      return res.status(500).json
    }

    // verifies the JWT
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET || '');
    } catch {
      return res.status(500).json
    }

    const user_id = decoded.sub;

    // checks if the user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user_id)
      .single();

    // error handling if user is not found
    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // retrieves stamp cards with num_stamps value of 10
    const { data: stampCards, error: stampCardError } = await supabase
      .from('stamp_card')
      .select('id, stamps, created_at')
      .eq('user_id', user_id)
      .eq('num_stamps', 10)
      .order('created_at', { ascending: false });

    if (stampCardError) {
      return res.status(500).json({ error: 'Failed to fetch stamp cards' });
    }

    // finds cards where stanp length is 10
    const validCard = stampCards?.find(
      card => Array.isArray(card.stamps) && card.stamps.length === 10
    );

    if (!validCard) {
      return res.status(400).json({ error: 'No stamp cards follow the criteria' });
    }

    // deletes the most recent valid card
    const { error: deleteError } = await supabase
      .from('stamp_card')
      .delete()
      .eq('id', validCard.id);

    if (deleteError) {
      return res.status(500).json
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json
  }
}
