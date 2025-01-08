import { Product } from '@/types/product';

const formatToSixSignificantFigures = (num: number): string => {
  if (num === 0) return '0';
  const significantFigures = 6;
  
  // Handle large numbers without scientific notation
  if (num >= 1000) {
    return num.toLocaleString('en-US', {
      minimumSignificantDigits: significantFigures,
      maximumSignificantDigits: significantFigures
    });
  }
  
  return Number(num).toPrecision(significantFigures);
};

export const calculateStats = (products: Product[]) => {
  if (!products || products.length === 0) {
    return null;
  }

  console.log('Calculating stats for products:', products.length);

  const totalAnalyzed = products.length;
  const healthyProducts = products.filter(p => p.category === 'healthy').length;
  const harmfulProducts = products.filter(p => p.category === 'harmful').length;
  const moderateRisk = products.filter(p => p.category === 'restricted').length;
  
  // Calculate average health score with proper precision
  const totalHealthScore = products.reduce((acc, curr) => acc + (curr.health_score || 0), 0);
  const avgHealthScore = totalAnalyzed > 0 ? totalHealthScore / totalAnalyzed : 0;

  const highRiskProducts = products.filter(
    p => p.has_fatal_incidents || p.has_serious_adverse_events
  ).length;

  // Calculate analysis cost with proper precision
  const totalAnalysisCost = products.reduce((acc, curr) => acc + (curr.analysis_cost || 0), 0);
  const avgAnalysisCost = totalAnalyzed > 0
    ? (totalAnalysisCost / totalAnalyzed).toFixed(6)
    : '0.000000';

  const topPerformers = products.filter(p => (p.health_score || 0) > 93).length;

  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const dailyScans = products.filter(
    p => new Date(p.created_at) > last24Hours
  ).length;

  // Fixed accuracy rate
  const accuracyRate = 98.5;
  
  // Generate random active users between 1,200 and 13,000
  const randomActiveUsers = Math.floor(Math.random() * (13000 - 1200 + 1)) + 1200;
  
  // Count total ingredients across all products
  const totalIngredients = products.reduce((acc, product) => {
    return acc + (Array.isArray(product.ingredients) ? product.ingredients.length : 0);
  }, 0);

  console.log('Stats calculation completed:', {
    totalAnalyzed,
    healthyProducts,
    harmfulProducts,
    moderateRisk,
    avgHealthScore,
    highRiskProducts,
    totalIngredients
  });

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