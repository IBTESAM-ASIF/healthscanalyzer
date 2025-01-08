import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bwuvybxxfpcxoqtsfjgs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dXZ5Ynh4ZnBjeG9xdHNmamdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMjI4NzgsImV4cCI6MjA1MTU5ODg3OH0.g6oq4sQBFdtGP8q3slBeMiDbNXid86fVRaFE-G0eCi4";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
    },
  }
);