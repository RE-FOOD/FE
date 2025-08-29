import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import mapApi, { StoreSummary } from '@/api/map';
import type { GetSortedStoreRequest, PaginatedStoresResponse } from '@/api/map';
import { ApiResponse } from '@/types/api';
import { StoreSortOption } from '@/types/domain';

interface UseMapProps {
  latitude: number;
  longitude: number;
  radiusKm?: number;
  sort?: StoreSortOption;
  limit?: number;
}

interface UseInfiniteStoresParams {
  latitude: number;
  longitude: number;
  radiusKm?: number;
  sort?: StoreSortOption;
  limit?: number;
  enabled: boolean;
}

function useMap({ latitude, longitude, radiusKm = 5.0 }: UseMapProps) {
  return useQuery({
    queryKey: ['map', latitude, longitude, radiusKm],
    queryFn: () => mapApi.map({ latitude: latitude!, longitude: longitude!, radiusKm }),
    enabled: !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000,
  });
}

const useStoreSummary = (storeId: number, latitude: number, longitude: number) => {
  return useQuery<ApiResponse<StoreSummary>, Error>({
    queryKey: ['storeSummary', storeId, latitude, longitude],
    queryFn: () => mapApi.storeSummary(storeId, latitude, longitude),
    enabled: storeId != null && latitude != null && longitude != null,
  });
};

const useInfiniteStores = ({
  latitude,
  longitude,
  radiusKm = 5.0,
  sort = 'NEAR',
  limit = 10,
  enabled = true,
}: UseInfiniteStoresParams) => {
  const queryKey = ['infiniteStores', latitude, longitude, radiusKm, sort, limit];

  const { data, error, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, refetch } =
    useInfiniteQuery<ApiResponse<PaginatedStoresResponse>, Error>({
      queryKey: queryKey,
      queryFn: ({ pageParam }) => {
        const request: GetSortedStoreRequest = {
          latitude,
          longitude,
          radiusKm,
          sort,
          limit,
          cursorId: pageParam as number | null,
        };
        return mapApi.getSortedStores(request);
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
      },
      enabled: enabled && !!latitude && !!longitude,
    });

  const stores = data?.pages.flatMap((page) => page.data.stores) ?? [];

  return {
    stores,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    hasNextPage: hasNextPage,
    error,
    fetchNextPage,
    refetch,
    currentSort: sort,
  };
};

export default { useMap, useStoreSummary, useInfiniteStores };
