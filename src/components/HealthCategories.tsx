import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const categories = [
  {
    title: "Healthy Products",
    description: "All ingredients pass our strict health criteria",
    color: "health-good",
  },
  {
    title: "Restricted Products",
    description: "Contains ingredients that should be consumed in moderation",
    color: "health-moderate",
  },
  {
    title: "Harmful Products",
    description: "Contains ingredients with potential health risks",
    color: "health-poor",
  },
];

export const HealthCategories = () => {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-gradient glow">Health Categories</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.title} className="card-gradient border border-primary/20 relative group hover:shadow-lg transition-all card-glow">
              <div className={`absolute inset-x-0 h-1 top-0 bg-${category.color} rounded-t-lg`} />
              <CardHeader>
                <CardTitle className="text-gradient">{category.title}</CardTitle>
                <CardDescription className="text-purple-200/70">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
                  <span className="text-2xl font-bold text-purple-300/50">Coming Soon</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};