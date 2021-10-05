import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qvxokradfbdvxjlgtues.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTk1NjgxNSwiZXhwIjoxOTQ1NTMyODE1fQ.Lcygr9azVIGV2wgSjLXbQNukrw89Gg4sTNEsxz3HfYA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'http://137.184.132.251:8000';
// const supabaseKey =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYyNzIwODU0MCwiZXhwIjoxOTc0MzYzNzQwLCJhdWQiOiIiLCJzdWIiOiIiLCJyb2xlIjoiYW5vbiJ9.sUHErUOiKZ3nHQIxy-7jND6B80Uzf9G4NtMLmL6HXPQ';

// export const supabase = createClient(supabaseUrl, supabaseKey);
