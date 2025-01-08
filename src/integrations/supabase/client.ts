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
  
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.id);
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed successfully');
  } else if (event === 'USER_UPDATED') {
    console.log('User data updated');
  } else if (event === 'INITIAL_SESSION') {
    console.log('Initial session loaded');
  } else if (event === 'ERROR') {
    console.error('Auth error occurred:', session);
    // Handle JWT errors by attempting to refresh the session
    if (session?.error?.message?.includes('JWT')) {
      console.log('JWT error detected, attempting to refresh session...');
      supabase.auth.refreshSession();
    }
  }
});