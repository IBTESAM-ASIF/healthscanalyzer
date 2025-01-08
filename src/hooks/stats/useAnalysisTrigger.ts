import { useToast } from "@/hooks/use-toast";

export const useAnalysisTrigger = () => {
  const { toast } = useToast();

  const triggerInitialAnalysis = async () => {
    try {
      toast({
        title: "Analysis Started",
        description: "Initial product analysis has been triggered.",
      });
    } catch (error) {
      console.error('Error triggering analysis:', error);
      toast({
        title: "Error",
        description: "Failed to trigger initial analysis.",
        variant: "destructive",
      });
    }
  };

  return { triggerInitialAnalysis };
};