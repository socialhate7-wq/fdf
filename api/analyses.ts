import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!supabase) return res.status(200).json([]);
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) {
      console.warn('Supabase analyses query error:', error.message);
      return res.status(200).json([]);
    }
    return res.status(200).json(data || []);
  } catch (err: any) {
    return res.status(200).json([]);
  }
}
