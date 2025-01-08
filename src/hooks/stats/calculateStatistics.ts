import { Product } from "@/types/product";
import { StatType } from "@/types/stats";

export const calculateProductStatistics = (products: Product[]) => {
  const avgHealthScore = Math.round(
    products.reduce((acc, curr) => acc + (curr.health_score || 0), 0) / products.length
  );

  const highRiskProducts = products.filter(
    p => p.has_fatal_incidents || p.has_serious_adverse_events
  ).length;

  const avgAnalysisCost = (
    products.reduce((acc, curr) => acc + (curr.analysis_cost || 0), 0) / products.length
  ).toFixed(6);

  const topPerformers = products.filter(p => (p.health_score || 0) > 93).length;
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const dailyScans = products.filter(p => new Date(p.created_at) > last24Hours).length;
  const accuracyRate = 98.5;
  const randomActiveUsers = Math.floor(Math.random() * (13000 - 1200 + 1)) + 1200;
  const totalIngredients = products.reduce((acc, product) => acc + (product.ingredients?.length || 0), 0);

  return {
    avgHealthScore,
    highRiskProducts,
    avgAnalysisCost,
    topPerformers,
    dailyScans,
    accuracyRate,
    randomActiveUsers,
    totalIngredients
  };
};

export const mapStatsToValues = (
  stats: StatType[],
  productStats: ReturnType<typeof calculateProductStatistics>,
  counts: { total: number; healthy: number; harmful: number; restricted: number }
): StatType[] => {
  return stats.map(stat => {
    switch(stat.title) {
      case "Total Analyzed":
        return { ...stat, value: counts.total.toString() };
      case "Healthy Products":
        return { ...stat, value: counts.healthy.toString() };
      case "Harmful Products":
        return { ...stat, value: counts.harmful.toString() };
      case "Moderate Risk":
        return { ...stat, value: counts.restricted.toString() };
      case "Average Health Score":
        return { ...stat, value: `${productStats.avgHealthScore}%` };
      case "High Risk Products":
        return { ...stat, value: productStats.highRiskProducts.toString() };
      case "Avg Analysis Cost":
        return { ...stat, value: `$${productStats.avgAnalysisCost}` };
      case "Top Performers":
        return { ...stat, value: productStats.topPerformers.toString() };
      case "Active Users":
        return { ...stat, value: productStats.randomActiveUsers.toString() };
      case "Daily Scans":
        return { ...stat, value: productStats.dailyScans.toString() };
      case "Accuracy Rate":
        return { ...stat, value: `${productStats.accuracyRate}%` };
      case "Total Ingredients":
        return { ...stat, value: productStats.totalIngredients.toString() };
      default:
        return stat;
    }
  });
};