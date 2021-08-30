import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qvxokradfbdvxjlgtues.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTk1NjgxNSwiZXhwIjoxOTQ1NTMyODE1fQ.Lcygr9azVIGV2wgSjLXbQNukrw89Gg4sTNEsxz3HfYA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
