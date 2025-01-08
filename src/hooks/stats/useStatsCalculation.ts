import { Product } from '@/types/product';

const formatToSixSignificantFigures = (num: number): string => {
  if (num === 0) return '0';
  const significantFigures = 6;
  return Number(num).toPrecision(significantFigures);
};

export const calculateStats = (products: Product[]) => {
  if (!products || products.length === 0) {
    return null;
  }

  const totalAnalyzed = products.length;
  const healthyProducts = products.filter(p => p.category === 'healthy').length;
  const harmfulProducts = products.filter(p => p.category === 'harmful').length;
  const moderateRisk = products.filter(p => p.category === 'restricted').length;
  
  const avgHealthScore = products.length > 0 
    ? products.reduce((acc, curr) => acc + (curr.health_score || 0), 0) / totalAnalyzed
    : 0;

  const highRiskProducts = products.filter(
    p => p.has_fatal_incidents || p.has_serious_adverse_events
  ).length;

  const totalAnalysisCost = products.reduce((acc, curr) => acc + (curr.analysis_cost || 0), 0);
  const avgAnalysisCost = products.length > 0
    ? (totalAnalysisCost / totalAnalyzed).toFixed(6)
    : '0.000000';

  const topPerformers = products.filter(p => (p.health_score || 0) > 93).length;

  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const dailyScans = products.filter(
    p => new Date(p.created_at) > last24Hours
  ).length;

  const accuracyRate = 98.5;
  const randomActiveUsers = Math.floor(Math.random() * (13000 - 1200 + 1)) + 1200;
  const totalIngredients = products.reduce((acc, product) => acc + (product.ingredients?.length || 0), 0);

  return {
    totalAnalyzed: formatToSixSignificantFigures(totalAnalyzed),
    healthyProducts: formatToSixSignificantFigures(healthyProducts),
    harmfulProducts: formatToSixSignificantFigures(harmfulProducts),
    moderateRisk: formatToSixSignificantFigures(moderateRisk),
    avgHealthScore: formatToSixSignificantFigures(avgHealthScore),
    highRiskProducts: formatToSixSignificantFigures(highRiskProducts),
    avgAnalysisCost,
    topPerformers: formatToSixSignificantFigures(topPerformers),
    dailyScans: formatToSixSignificantFigures(dailyScans),
    accuracyRate: formatToSixSignificantFigures(accuracyRate),
    randomActiveUsers: formatToSixSignificantFigures(randomActiveUsers),
    totalIngredients: formatToSixSignificantFigures(totalIngredients)
  };
};