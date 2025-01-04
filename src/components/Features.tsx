import { Brain, Database, ChartBar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze ingredients to provide accurate health insights",
    icon: Brain,
  },
  {
    title: "Real-time Database",
    description: "Continuous monitoring and updates of product information",
    icon: Database,
  },
  {
    title: "Health Analytics",
    description: "Comprehensive health scoring and ingredient breakdown",
    icon: ChartBar,
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-gradient glow">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="card-gradient border-primary/20 relative overflow-hidden group transition-all hover:shadow-lg hover:shadow-primary/20 card-glow hover-lift">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-gradient">{feature.title}</CardTitle>
                <CardDescription className="text-purple-200/70">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-1 w-12 bg-primary/50 rounded-full group-hover:w-16 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};