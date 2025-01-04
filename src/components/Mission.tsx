import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const Mission = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-6 text-gradient glow">Our Mission</h2>
          <p className="text-purple-200/70 mb-12 text-lg leading-relaxed">
            We believe in the power of informed decisions. Our mission is to leverage cutting-edge AI technology to analyze food products at scale, making complex ingredient lists accessible and understandable for everyone.
          </p>
          <Card className="card-gradient neon-border card-glow">
            <CardHeader>
              <CardTitle className="text-gradient">Transparency Through Technology</CardTitle>
              <CardDescription className="text-purple-200/70">
                Using advanced AI and machine learning to decode ingredient lists and provide clear, actionable insights about the food you consume.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-effect p-4 rounded-lg">
                  <div className="text-primary font-semibold mb-2">Data-Driven Analysis</div>
                  <p className="text-sm text-purple-200/60">Continuous processing of ingredient data for accurate insights</p>
                </div>
                <div className="glass-effect p-4 rounded-lg">
                  <div className="text-primary font-semibold mb-2">Real-time Updates</div>
                  <p className="text-sm text-purple-200/60">Regular updates to our product database and analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-1 flex-1 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary/50 rounded-full relative">
                    <div className="absolute inset-0 bg-white/20 animate-shimmer -translate-x-full transform-gpu" />
                  </div>
                </div>
                <span className="text-sm font-medium text-purple-200/70">Progress</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};