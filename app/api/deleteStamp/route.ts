import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || "",
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 1. Get user_id from JWT in cookie
    const token = req.cookies.SiteSessionJWT;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: number };
    const user_id = decoded.user_id;

    // 2. Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user_id)
      .single();

    if (userError || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 3. Find stamp cards with num_stamps = 10
    const { data: stampCards, error: stampCardError } = await supabase
      .from('stamp_card')
      .select('id, created_at')
      .eq('user_id', user_id)
      .eq('num_stamps', 10)
      .order('created_at', { ascending: false });

    if (stampCardError) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (!stampCards || stampCards.length === 0) {
      return res.status(400).json({ message: 'No stamp cards meet the criteria' });
    }

    // 4. Get the most recent stamp card ID
    const stampCardId = stampCards[0].id;

    // 5. Delete the stamp card
    const { error: deleteError } = await supabase
      .from('stamp_card')
      .delete()
      .eq('id', stampCardId);

    if (deleteError) {
      return res.status(500).json({ message: 'Failed to delete stamp card' });
    }

    return res.status(200).json({ message: 'Stamp card deleted successfully' });
  } catch (error) {
    console.error('Error in deleteStampCard:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
}