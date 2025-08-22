import { useMutation, useQuery } from '@tanstack/react-query';
import { getLocations, addLocation, deleteLocation, setDefaultLocation } from '@/api/location';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants/keys';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/api';
import { LocationFull } from '@/types/domain';

export function useSetDefaultLocation(mutationOptions?: UseMutationCustomOptions<LocationFull>) {
  return useMutation({
    mutationFn: (locationId: number) => setDefaultLocation(locationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.LOCATION] });
    },
    ...mutationOptions,
  });
}

function useGetLocations(queryOptions?: UseQueryCustomOptions<LocationFull[]>) {
  return useQuery({
    queryKey: [queryKeys.LOCATION, queryKeys.GET_LOCATIONS],
    queryFn: getLocations,
    ...queryOptions,
  });
}

function useAddLocation(mutationOptions?: UseMutationCustomOptions<LocationFull>) {
  return useMutation({
    mutationFn: async ({ address, roadAddress }: { address: string; roadAddress: string }) => {
      // 주소 추가, 즉시 기본 주소로 변경
      const newLocation = await addLocation(address, roadAddress);
      await setDefaultLocation(newLocation.id);
      return newLocation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.LOCATION] });
    },
    ...mutationOptions,
  });
}

function useDeleteLocation(mutationOptions?: UseMutationCustomOptions<void>) {
  return useMutation({
    mutationFn: (locationId: number) => deleteLocation(locationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.LOCATION] });
    },
    ...mutationOptions,
  });
}

function useLocation() {
  const locationsQuery = useGetLocations();
  const addLocationMutation = useAddLocation();
  const deleteLocationMutation = useDeleteLocation();
  const setDefaultLocationMutation = useSetDefaultLocation();

  return {
    locationsQuery,
    addLocationMutation,
    deleteLocationMutation,
    setDefaultLocationMutation,
  };
}

export default useLocation;
