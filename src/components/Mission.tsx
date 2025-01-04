import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const Mission = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4 text-gradient">Our Mission</h2>
          <p className="text-muted-foreground mb-8">
            We believe in the power of informed decisions. Our mission is to leverage cutting-edge AI technology to analyze food products at scale, making complex ingredient lists accessible and understandable for everyone.
          </p>
          <Card className="card-gradient border border-border/50">
            <CardHeader>
              <CardTitle className="text-gradient">Transparency Through Technology</CardTitle>
              <CardDescription className="text-muted-foreground">
                Using advanced AI and machine learning to decode ingredient lists and provide clear, actionable insights about the food you consume.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary rounded-full relative">
                    <div className="absolute inset-0 bg-white/20 animate-shimmer -translate-x-full transform-gpu" />
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Progress</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};