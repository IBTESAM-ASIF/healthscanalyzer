import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAnalysisTrigger = () => {
  const { toast } = useToast();

  const triggerInitialAnalysis = async () => {
    try {
      console.log('Triggering initial analysis...');
      
      const { data, error } = await supabase.functions.invoke('auto-product-analysis', {
        body: { trigger: 'initial' }
      });

      if (error) {
        console.error('Error from edge function:', error);
        throw error;
      }

      console.log('Analysis trigger response:', data);

      toast({
        title: "Analysis Started",
        description: "Initial product analysis has been triggered. Data will appear shortly.",
      });
    } catch (error) {
      console.error('Error triggering analysis:', error);
      toast({
        title: "Error",
        description: "Failed to trigger initial analysis. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return { triggerInitialAnalysis };
};