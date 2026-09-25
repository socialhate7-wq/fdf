import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

let rawUrl = process.env.SUPABASE_URL || '';
if (rawUrl.endsWith('/rest/v1/')) {
  rawUrl = rawUrl.replace('/rest/v1/', '');
} else if (rawUrl.endsWith('/rest/v1')) {
  rawUrl = rawUrl.replace('/rest/v1', '');
}
const supabaseUrl = rawUrl.replace(/\/+$/, '');
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

