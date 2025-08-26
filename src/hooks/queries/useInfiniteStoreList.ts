import { useInfiniteQuery, InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { getStoreList, StoreListResponse, StoreListParams } from '@/api/store';
import { queryKeys } from '@/constants/keys';

export type BaseFilters = Pick<StoreListParams, 'category' | 'keyword' | 'sort' | 'limit'>;
type PageParam = { cursorId: number; direction: boolean };

export function useInfiniteStoreList(
  filters: BaseFilters
): UseInfiniteQueryResult<InfiniteData<StoreListResponse>, Error> {
  const limit = filters.limit ?? 15;

  return useInfiniteQuery<
    StoreListResponse, // TQueryFnData (각 페이지 응답)
    Error, // TError
    InfiniteData<StoreListResponse>, // ✅ TData (pages 포함)
    [string, BaseFilters], // TQueryKey
    PageParam // TPageParam
  >({
    queryKey: [queryKeys.STORE, filters],
    initialPageParam: { cursorId: 0, direction: true },

    queryFn: ({ pageParam }) =>
      getStoreList({
        ...filters,
        cursorId: pageParam.cursorId,
        direction: pageParam.direction,
      }),

    getNextPageParam: (last, pages) => {
      if (last.nextCursor == null) return undefined;
      if ((last.stores?.length ?? 0) < limit) return undefined;

      const prevPageIdx = pages.length - 2;
      const prevNext = prevPageIdx >= 0 ? pages[prevPageIdx].nextCursor : null;
      if (prevNext != null && prevNext === last.nextCursor) return undefined;

      return { cursorId: last.nextCursor, direction: true };
    },

    // getPreviousPageParam: (first) => {
    //   if (first.prevCursor == null) return undefined;
    //   return { cursorId: first.prevCursor, direction: false };
    // },

    staleTime: 60_000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
