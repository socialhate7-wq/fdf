import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './lib/supabase.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!supabase) return res.status(200).json([]);
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .order('avg_hate_percentage', { ascending: false });

    if (error) {
      console.warn('Supabase channels query error:', error.message);
      return res.status(200).json([]);
    }
    return res.status(200).json(data || []);
  } catch (err: any) {
    return res.status(200).json([]);
  }
}
