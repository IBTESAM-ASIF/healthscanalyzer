import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from './cors.ts';

export async function checkForDuplicates(
  supabaseClient: any,
  productName: string,
  company: string
) {
  console.log(`[${new Date().toISOString()}] Checking for duplicates: ${productName} by ${company}`);

  const { data: existingProducts, error: searchError } = await supabaseClient
    .from('products')
    .select('id, name, company')
    .or(`and(name.ilike.${productName},company.ilike.${company})`);

  if (searchError) {
    console.error(`[${new Date().toISOString()}] Error checking duplicates:`, searchError);
    throw searchError;
  }

  const isDuplicate = existingProducts?.some(product => {
    const nameMatch = product.name?.toLowerCase() === productName?.toLowerCase();
    const companyMatch = product.company?.toLowerCase() === company?.toLowerCase();
    return nameMatch && companyMatch;
  });

  if (isDuplicate) {
    console.log(`[${new Date().toISOString()}] Duplicate found: ${productName} by ${company}`);
  }

  return isDuplicate;
}