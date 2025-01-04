import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create cron job to run every 10 minutes
    const { data, error } = await supabaseClient.rpc('setup_product_analysis_cron', {
      schedule: '*/10 * * * *',
      function_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/auto-product-analysis`,
      auth_header: `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
      body: JSON.stringify({ limit: 5 })
    });

    if (error) throw error;

    console.log('Successfully set up cron job for product analysis');

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error setting up cron job:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});