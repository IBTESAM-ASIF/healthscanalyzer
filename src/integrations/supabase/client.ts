import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://bwuvybxxfpcxoqtsfjgs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dXZ5Ynh4ZnBjeG9xdHNmamdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3MjY0MDAsImV4cCI6MjAyMDMwMjQwMH0.PwanC4ODlrZqBXXn_Q-l_4qV-VkiapYwGZQdBh_dBGE'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: localStorage
  },
  global: {
    fetch: fetch
  }
})

// Add error logging for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event);
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.id);
  }
})