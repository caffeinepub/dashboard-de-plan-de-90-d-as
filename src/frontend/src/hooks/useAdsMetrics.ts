import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { AdsMetrics } from '../backend';

export function useAdsMetrics() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const adsMetricsQuery = useQuery<AdsMetrics[]>({
    queryKey: ['adsMetrics'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAdsMetrics();
    },
    enabled: !!actor && !isFetching,
  });

  const addAdsMetricsMutation = useMutation({
    mutationFn: async ({
      month,
      spent,
      leads,
      appointments,
      converted,
    }: {
      month: string;
      spent: number;
      leads: bigint;
      appointments: bigint;
      converted: bigint;
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.addAdsMetrics(month, spent, leads, appointments, converted);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adsMetrics'] });
    },
  });

  return {
    adsMetrics: adsMetricsQuery.data || [],
    isLoading: adsMetricsQuery.isLoading,
    addAdsMetricsMutation,
  };
}
