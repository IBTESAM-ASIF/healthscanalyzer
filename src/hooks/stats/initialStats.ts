import { Stat } from '@/types/stats';
import { 
  BarChart3, CheckCircle, XCircle, Timer,
  TrendingUp, AlertTriangle, Bolt, Award,
  Users, Brain, Shield, Leaf
} from "lucide-react";

export const initialStats: Stat[] = [
  {
    title: "Total Analyzed",
    value: "0",
    description: "Total number of products analyzed",
    icon: BarChart3,
    color: "bg-blue-600/10",
    iconColor: "text-blue-600"
  },
  {
    title: "Healthy Products",
    value: "0",
    description: "Products classified as healthy",
    icon: CheckCircle,
    color: "bg-green-600/10",
    iconColor: "text-green-600"
  },
  {
    title: "Harmful Products",
    value: "0",
    description: "Products classified as harmful",
    icon: XCircle,
    color: "bg-red-600/10",
    iconColor: "text-red-600"
  },
  {
    title: "Moderate Risk",
    value: "0",
    description: "Products with moderate health risks",
    icon: Timer,
    color: "bg-yellow-600/10",
    iconColor: "text-yellow-600"
  },
  {
    title: "Average Health Score",
    value: "0%",
    description: "Average health score across all products",
    icon: TrendingUp,
    color: "bg-purple-600/10",
    iconColor: "text-purple-600"
  },
  {
    title: "High Risk Products",
    value: "0",
    description: "Products with serious health concerns",
    icon: AlertTriangle,
    color: "bg-orange-600/10",
    iconColor: "text-orange-600"
  },
  {
    title: "Avg Analysis Cost",
    value: "$0.000000",
    description: "Average cost per product analysis",
    icon: Bolt,
    color: "bg-teal-600/10",
    iconColor: "text-teal-600"
  },
  {
    title: "Top Performers",
    value: "0",
    description: "Products with health score > 93",
    icon: Award,
    color: "bg-cyan-600/10",
    iconColor: "text-cyan-600"
  },
  {
    title: "Active Users",
    value: "0",
    description: "Currently active platform users",
    icon: Users,
    color: "bg-indigo-600/10",
    iconColor: "text-indigo-600"
  },
  {
    title: "Daily Scans",
    value: "0",
    description: "Products analyzed in last 24 hours",
    icon: Brain,
    color: "bg-pink-600/10",
    iconColor: "text-pink-600"
  },
  {
    title: "Accuracy Rate",
    value: "0%",
    description: "AI analysis accuracy rate",
    icon: Shield,
    color: "bg-emerald-600/10",
    iconColor: "text-emerald-600"
  },
  {
    title: "Total Ingredients",
    value: "0",
    description: "Total unique ingredients analyzed",
    icon: Leaf,
    color: "bg-violet-600/10",
    iconColor: "text-violet-600"
  }
];