import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useRealtimeUpdates = (refetch: () => void) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log('Setting up real-time subscription...');
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('Received database change:', payload);
          refetch();
          toast({
            title: "Data Updated",
            description: "Product distribution chart has been updated with new data.",
          });
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to real-time updates');
        }
      });

    return () => {
      console.log('Cleaning up real-time subscription...');
      supabase.removeChannel(channel);
    };
  }, [toast, refetch]);
};