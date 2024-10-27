import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error('Missing VITE_SUPABASE_URL environment variable');
if (!supabaseKey) throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');

// Ensure URL is valid before creating client
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error('Invalid VITE_SUPABASE_URL. Please provide a valid URL.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);