import { Brain, ShieldCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const categories = [
  {
    title: "Healthy Products",
    description: "Products that have passed our comprehensive AI analysis",
    icon: ShieldCheck,
    color: "health-good",
    score: "8.5-10",
    criteria: [
      "All natural ingredients",
      "No harmful chemicals",
      "Scientifically verified safety",
      "Regular quality updates"
    ],
  },
  {
    title: "Restricted Products",
    description: "Use with caution - contains some concerning ingredients",
    icon: Brain,
    color: "health-moderate",
    score: "5.0-8.4",
    criteria: [
      "Some processed ingredients",
      "Limited artificial additives",
      "Moderate risk factors",
      "Usage limitations"
    ],
  },
  {
    title: "Harmful Products",
    description: "Products flagged for potentially dangerous ingredients",
    icon: AlertTriangle,
    color: "health-poor",
    score: "0-4.9",
    criteria: [
      "Known harmful ingredients",
      "High risk chemicals",
      "Safety concerns",
      "Not recommended"
    ],
  },
];

export const HealthCategories = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] -z-10" />
      <div className="absolute inset-0 bg-gradient-cosmic -z-10" />

      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Health Analysis Categories
          </h2>
          <p className="text-zinc-400 md:text-lg max-w-2xl mx-auto">
            Our AI-powered system categorizes products based on comprehensive ingredient analysis
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.title} 
                className="glass-effect relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-x-0 h-1 top-0 bg-${category.color} rounded-t-lg`} />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-${category.color}/20`}>
                      <Icon className={`w-6 h-6 text-${category.color}`} />
                    </div>
                    <CardTitle className="text-gradient">{category.title}</CardTitle>
                  </div>
                  <div className="text-sm font-medium text-purple-400">Score Range: {category.score}</div>
                  <CardDescription className="text-zinc-400">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.criteria.map((criterion, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-zinc-300">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${category.color}`} />
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};