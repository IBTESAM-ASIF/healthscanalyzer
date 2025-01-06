import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LOGO_PROMPT = `Create a sophisticated, modern logo for 'HealthScanalyzer', a health-tech platform that uses AI to analyze product safety:

Key Visual Elements:
- A sleek DNA helix morphing into digital scanning lines
- Gradient colors: vibrant purple (#8B5CF6) to magenta pink (#D946EF)
- Minimalist and clean design with a medical/tech fusion
- Abstract 'H' or 'HS' monogram subtly integrated
- Sacred geometry patterns suggesting precision and trust

Must Include:
- Professional health symbolism (subtle cross or heartbeat element)
- Tech elements (circuit patterns, scan lines, or data visualization)
- Modern geometric shapes (hexagon or circle base)
- Clean negative space usage
- High contrast for visibility

Style Requirements:
- Ultra-modern and premium feel
- Perfect symmetry and balance
- Scalable for all sizes (app icon to billboard)
- Works on light and dark backgrounds
- No text required
- Professional gradient effects
- Corporate-ready design

The final logo should convey:
- Advanced AI technology
- Medical authority
- Trust and safety
- Innovation and precision
- Professional excellence

Output as a clean, vector-style design with sharp edges and perfect geometry. Ensure it looks premium and established, suitable for a leading health-tech platform.`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: LOGO_PROMPT,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        style: "vivid"
      }),
    })

    const data = await response.json()

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})