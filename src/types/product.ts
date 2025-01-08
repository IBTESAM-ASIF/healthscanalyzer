export type ProductCategory = 'healthy' | 'restricted' | 'harmful';

export interface Product {
  id: string;
  name: string;
  amazon_url?: string;
  ingredients?: string[];
  category?: ProductCategory;
  health_score?: number;
  analysis_date?: string;
  analysis_summary?: string;
  pros?: string[];
  cons?: string[];
  created_at: string;
  has_fatal_incidents?: boolean;
  has_serious_adverse_events?: boolean;
  allergy_risks?: string[];
  drug_interactions?: string[];
  special_population_warnings?: string[];
  environmental_impact?: string;
  safety_incidents?: string[];
  analysis_cost?: number;
  company?: string;
}