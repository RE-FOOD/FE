import { useQuery } from '@tanstack/react-query';
import map from '@/api/map';
import { UseQueryCustomOptions } from '@/types/api';
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
    queryFn: () => map({ latitude: latitude!, longitude: longitude!, radiusKm }),
    enabled: !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });
}
export default useMap;
