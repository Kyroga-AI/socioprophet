import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY } from '../../../variables/environment';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_PUBLIC_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
