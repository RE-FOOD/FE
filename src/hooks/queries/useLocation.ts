import { useQuery } from '@tanstack/react-query';
import { getLocations } from '@/api/location';
import { queryKeys } from '@/constants/keys';
import { UseQueryCustomOptions } from '@/types/api';
import { LocationFull } from '@/types/domain';

function useGetLocations(queryOptions?: UseQueryCustomOptions<LocationFull[]>) {
  return useQuery({
    queryFn: getLocations,
    queryKey: [queryKeys.LOCATION, queryKeys.GET_LOCATIONS],
    ...queryOptions,
  });
}

function useLocation() {
  const locationsQuery = useGetLocations();

  return { locationsQuery };
}

export default useLocation;
