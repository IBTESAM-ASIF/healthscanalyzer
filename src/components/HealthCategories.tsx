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
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Health Categories</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.title} className="relative group hover:shadow-lg transition-all">
              <div className={`absolute inset-x-0 h-1 top-0 bg-${category.color} rounded-t-lg`} />
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 rounded-lg bg-muted/50 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">Coming Soon</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};