// adding in Supabase (testing)...
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY } from '../../../variables/environment';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_PUBLIC_ANON_KEY;

export const supabase = createClient(
  'https://orjwtqvawrdroltupmgf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzg3MTAzMywiZXhwIjoxOTQzNDQ3MDMzfQ.dtaDMhOL-4h-g0r7JyoZA9EOjKfIBbE6fnZpkZBtBZA',
);
