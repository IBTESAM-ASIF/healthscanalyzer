import { Brain, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze ingredients to provide accurate health insights",
    icon: Brain,
  },
  {
    title: "Real-time Processing",
    description: "Continuous monitoring and updates of product information",
    icon: Zap,
  },
  {
    title: "Verified Data",
    description: "Rigorous verification process ensures reliable information",
    icon: Shield,
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="card-gradient border border-border/50 relative overflow-hidden group transition-all hover:shadow-lg hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-gradient">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
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