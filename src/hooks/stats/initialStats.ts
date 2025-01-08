import { Stat } from '@/types/stats';

export const initialStats: Stat[] = [
  {
    title: "Total Analyzed",
    value: "0",
    description: "Total number of products analyzed"
  },
  {
    title: "Healthy Products",
    value: "0",
    description: "Products classified as healthy"
  },
  {
    title: "Harmful Products",
    value: "0",
    description: "Products classified as harmful"
  },
  {
    title: "Moderate Risk",
    value: "0",
    description: "Products with moderate health risks"
  },
  {
    title: "Average Health Score",
    value: "0%",
    description: "Average health score across all products"
  },
  {
    title: "High Risk Products",
    value: "0",
    description: "Products with serious health concerns"
  },
  {
    title: "Avg Analysis Cost",
    value: "$0.000000",
    description: "Average cost per product analysis"
  },
  {
    title: "Top Performers",
    value: "0",
    description: "Products with health score > 93"
  },
  {
    title: "Active Users",
    value: "0",
    description: "Currently active platform users"
  },
  {
    title: "Daily Scans",
    value: "0",
    description: "Products analyzed in last 24 hours"
  },
  {
    title: "Accuracy Rate",
    value: "0%",
    description: "AI analysis accuracy rate"
  },
  {
    title: "Total Ingredients",
    value: "0",
    description: "Total unique ingredients analyzed"
  }
];