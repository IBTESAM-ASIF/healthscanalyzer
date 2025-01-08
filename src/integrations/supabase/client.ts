import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bwuvybxxfpcxoqtsfjgs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dXZ5Ynh4ZnBjeG9xdHNmamdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMjI4NzgsImV4cCI6MjA1MTU5ODg3OH0.g6oq4sQBFdtGP8q3slBeMiDbNXid86fVRaFE-G0eCi4";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: localStorage,
    storageKey: 'supabase.auth.token',
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    }
  }
});

// Add error handling through auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event);
  
  switch (event) {
    case 'SIGNED_OUT':
      console.log('User signed out');
      break;
    case 'SIGNED_IN':
      console.log('User signed in:', session?.user?.id);
      break;
    case 'TOKEN_REFRESHED':
      console.log('Token refreshed successfully');
      break;
    case 'USER_UPDATED':
      console.log('User data updated');
      break;
    case 'INITIAL_SESSION':
      console.log('Initial session loaded');
      break;
    default:
      // Handle potential errors
      if (event === 'PASSWORD_RECOVERY' || event === 'MFA_CHALLENGE_VERIFIED') {
        console.log(`Auth event: ${event}`);
      } else {
        console.error('Unexpected auth event:', event);
        // Check for JWT errors in the session
        const error = (session as any)?.error;
        if (error?.message?.includes('JWT')) {
          console.log('JWT error detected, attempting to refresh session...');
          supabase.auth.refreshSession();
        }
      }
  }
});