import { useQuery } from '@tanstack/react-query';
import mapApi, { StoreSummary } from '@/api/map';
import { UseQueryCustomOptions, ApiResponse } from '@/types/api';
import { Map } from '@/types/domain';

interface UseMapProps {
  latitude?: number | null;
  longitude?: number | null;
  radiusKm?: number;
  queryOptions?: UseQueryCustomOptions<Map[]>;
}

function useMap({ latitude, longitude, radiusKm = 5.0, queryOptions }: UseMapProps) {
  return useQuery({
    queryKey: ['map', latitude, longitude, radiusKm],
    queryFn: () => mapApi.map({ latitude: latitude!, longitude: longitude!, radiusKm }),
    enabled: !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });
}

const useStoreSummary = (storeId: number, latitude: number, longitude: number) => {
  return useQuery<ApiResponse<StoreSummary>, Error>({
    queryKey: ['storeSummary', storeId, latitude, longitude],
    queryFn: () => mapApi.storeSummary(storeId, latitude, longitude),
    enabled: storeId != null && latitude != null && longitude != null,
  });
};
export default { useMap, useStoreSummary };
