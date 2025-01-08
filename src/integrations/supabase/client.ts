import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bwuvybxxfpcxoqtsfjgs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dXZ5Ynh4ZnBjeG9xdHNmamdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMjI4NzgsImV4cCI6MjA1MTU5ODg3OH0.g6oq4sQBFdtGP8q3slBeMiDbNXid86fVRaFE-G0eCi4";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
    },
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
);

// Enhanced error handling utility
export const handleSupabaseError = (error: any) => {
  // Log detailed error information for debugging
  console.error('Supabase Error:', {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
    url: error.url,
    method: error.method,
    stack: error.stack
  });
  
  if (error.message === "Failed to fetch") {
    return "Network error. Please check your internet connection and try again in a few moments.";
  }
  
  if (error.code === "PGRST116") {
    return "Invalid query parameters. Please try again.";
  }

  if (error.message === "Request timeout") {
    return "The request timed out. Please try again.";
  }
  
  return "An unexpected error occurred. Please try again later.";
};