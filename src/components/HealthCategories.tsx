import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const categories = [
  {
    title: "Healthy Products",
    description: "All ingredients pass our strict health criteria",
    color: "health-good",
    score: "8.5-10",
    examples: ["Natural ingredients", "High nutritional value", "No artificial additives"],
  },
  {
    title: "Restricted Products",
    description: "Contains ingredients that should be consumed in moderation",
    color: "health-moderate",
    score: "5.0-8.4",
    examples: ["Some processed ingredients", "Moderate sugar content", "Limited artificial additives"],
  },
  {
    title: "Harmful Products",
    description: "Contains ingredients with potential health risks",
    color: "health-poor",
    score: "0-4.9",
    examples: ["High artificial content", "Excessive preservatives", "Known harmful ingredients"],
  },
];

export const HealthCategories = () => {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-gradient glow">Health Categories</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.title} className="card-gradient neon-border relative group hover:shadow-lg transition-all card-glow hover-lift">
              <div className={`absolute inset-x-0 h-1 top-0 bg-${category.color} rounded-t-lg`} />
              <CardHeader>
                <CardTitle className="text-gradient">{category.title}</CardTitle>
                <div className="text-sm font-medium text-primary/80">Score Range: {category.score}</div>
                <CardDescription className="text-purple-200/70">{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {category.examples.map((example, index) => (
                    <li key={index} className="text-sm text-purple-200/60 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                      {example}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};