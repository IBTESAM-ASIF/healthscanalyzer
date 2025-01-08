export type ProductCategory = 'healthy' | 'restricted' | 'harmful';

export interface Product {
  id: string;
  name: string;
  amazon_url?: string | null;
  ingredients?: string[] | null;
  category?: ProductCategory | null;
  health_score?: number | null;
  analysis_date?: string | null;
  analysis_summary?: string | null;
  pros?: string[] | null;
  cons?: string[] | null;
  created_at: string;
  has_fatal_incidents?: boolean | null;
  has_serious_adverse_events?: boolean | null;
  allergy_risks?: string[] | null;
  drug_interactions?: string[] | null;
  special_population_warnings?: string[] | null;
  environmental_impact?: string | null;
  safety_incidents?: string[] | null;
  analysis_cost?: number | null;
  company?: string | null;
}