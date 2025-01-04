import { useToast } from "@/hooks/use-toast";

export const useAnalysisTrigger = () => {
  const { toast } = useToast();

  const triggerInitialAnalysis = async () => {
    try {
      const response = await fetch(
        'https://bwuvybxxfpcxoqtsfjgs.supabase.co/functions/v1/auto-product-analysis',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ trigger: 'initial' }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to trigger analysis');
      }

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