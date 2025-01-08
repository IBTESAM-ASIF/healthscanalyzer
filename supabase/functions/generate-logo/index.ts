import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LOGO_PROMPT = `Create an ultra-premium, innovative logo for 'HealthScanAI Token' that merges medical technology with cryptocurrency aesthetics:

Key Visual Elements:
- A dynamic fusion of a medical cross/caduceus with blockchain/cryptocurrency elements
- Holographic 3D effect with depth and dimension
- Sacred geometry patterns forming a hexagonal grid in the background
- Subtle DNA helix structure integrated into the design
- Gleaming metallic finish with iridescent highlights
- Clean, modern sans-serif typography (if text is included)

Color Palette:
- Primary: Deep sapphire blue (#1E3A8A) representing trust and stability
- Secondary: Vibrant teal (#0D9488) suggesting health and technology
- Accent: Metallic gold (#FCD34D) for premium cryptocurrency feel
- Highlights: Ethereal purple (#7C3AED) for AI/innovation
- Background: Deep space black with subtle gradients

Design Requirements:
- Incorporate a stylized 'H' or '$HSAI' symbol
- Abstract medical scanning waves or pulse lines
- Blockchain nodes or connected neural network pattern
- Cutting-edge 3D rendering with realistic lighting
- Premium metallic/glass material textures
- Perfect symmetry and golden ratio proportions

Style Guidelines:
- Ultra-modern and futuristic aesthetic
- Professional grade finish suitable for both medical and crypto markets
- Scalable from small icons to large displays
- Clear silhouette that works in both light and dark modes
- Subtle motion suggestion through dynamic lines
- Enterprise-level polish and sophistication

The logo should convey:
- Advanced AI technology and innovation
- Medical authority and healthcare focus
- Blockchain security and value
- Premium investment opportunity
- Trust and scientific precision
- Future of healthcare technology

Additional Specifications:
- Ensure high contrast for visibility
- Include subtle gradient overlays
- Add dimensional shadows and highlights
- Create a sense of movement and energy
- Maintain clean, uncluttered composition
- Include space for potential text integration

Output as a high-end, photorealistic 3D render with perfect technical execution. The final result should look exceptionally premium and establish instant credibility in both healthcare and cryptocurrency markets.`

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