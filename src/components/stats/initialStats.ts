import { 
  BarChart3, CheckCircle, XCircle, Timer,
  TrendingUp, AlertTriangle, Bolt, Award,
  Users, Brain, Shield, Leaf
} from "lucide-react";

export const initialStats = [
  {
    title: "Total Analyzed",
    value: "0",
    icon: BarChart3,
    color: "bg-blue-600/10",
    iconColor: "text-blue-600",
    description: "Total number of products analyzed"
  },
  {
    title: "Healthy Products",
    value: "0",
    icon: CheckCircle,
    color: "bg-green-600/10",
    iconColor: "text-green-600",
    description: "Products marked as healthy"
  },
  {
    title: "Harmful Products",
    value: "0",
    icon: XCircle,
    color: "bg-red-600/10",
    iconColor: "text-red-600",
    description: "Products marked as harmful"
  },
  {
    title: "Moderate Risk",
    value: "0",
    icon: Timer,
    color: "bg-yellow-600/10",
    iconColor: "text-yellow-600",
    description: "Products with moderate risk"
  },
  {
    title: "Average Health Score",
    value: "0%",
    icon: TrendingUp,
    color: "bg-purple-600/10",
    iconColor: "text-purple-600",
    description: "Average health score across all products"
  },
  {
    title: "High Risk Products",
    value: "0",
    icon: AlertTriangle,
    color: "bg-orange-600/10",
    iconColor: "text-orange-600",
    description: "Products with high risk factors"
  },
  {
    title: "Avg Analysis Cost",
    value: "$0.00",
    icon: Bolt,
    color: "bg-teal-600/10",
    iconColor: "text-teal-600",
    description: "Average cost per analysis"
  },
  {
    title: "Top Performers",
    value: "0",
    icon: Award,
    color: "bg-cyan-600/10",
    iconColor: "text-cyan-600",
    description: "Products with exceptional health scores"
  },
  {
    title: "Active Users",
    value: "0",
    icon: Users,
    color: "bg-indigo-600/10",
    iconColor: "text-indigo-600",
    description: "Currently active users"
  },
  {
    title: "Daily Scans",
    value: "0",
    icon: Brain,
    color: "bg-pink-600/10",
    iconColor: "text-pink-600",
    description: "Scans performed in the last 24 hours"
  },
  {
    title: "Accuracy Rate",
    value: "0%",
    icon: Shield,
    color: "bg-emerald-600/10",
    iconColor: "text-emerald-600",
    description: "Analysis accuracy rate"
  },
  {
    title: "Total Ingredients",
    value: "0",
    icon: Leaf,
    color: "bg-violet-600/10",
    iconColor: "text-violet-600",
    description: "Total ingredients analyzed"
  }
];