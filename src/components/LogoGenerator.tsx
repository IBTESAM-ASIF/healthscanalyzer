import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const LogoGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const generateLogo = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-logo');
      
      if (error) throw error;
      
      if (data.data && data.data[0].url) {
        setLogoUrl(data.data[0].url);
        toast({
          title: "Success!",
          description: "Your logo has been generated successfully.",
        });
      }
    } catch (error) {
      console.error('Error generating logo:', error);
      toast({
        title: "Error",
        description: "Failed to generate logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">AI Logo Generator</h2>
        <p className="text-muted-foreground text-center">
          Generate a unique, professional logo for HealthScanalyzer using AI
        </p>
        
        {logoUrl && (
          <div className="relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden">
            <img
              src={logoUrl}
              alt="Generated Logo"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex justify-center">
          <Button
            onClick={generateLogo}
            disabled={isLoading}
            className="w-full max-w-xs"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Logo'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};