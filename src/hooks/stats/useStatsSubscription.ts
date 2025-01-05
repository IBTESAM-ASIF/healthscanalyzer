import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { debounce } from 'lodash';

export const useStatsSubscription = (onUpdate: () => void) => {
  const { toast } = useToast();

  const subscribeToStats = () => {
    const debouncedUpdate = debounce(() => {
      onUpdate();
      toast({
        title: "Statistics Updated",
        description: "New product analysis data is available.",
      });
    }, 1000);

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        debouncedUpdate
      )
      .subscribe();

    return () => {
      debouncedUpdate.cancel();
      supabase.removeChannel(channel);
    };
  };

  return { subscribeToStats };
};