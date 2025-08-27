import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
} from '@tanstack/react-query';
import {
  getMenuDetail,
  getStoreDetail,
  getStoreList,
  MenuDetail,
  StoreListParams,
  StoreListResponse,
} from '@/api/store';
import { queryKeys } from '@/constants/keys';
import { UseQueryCustomOptions } from '@/types/api';
import { StoreDetail } from '@/types/domain';

function useGetStoreList(params: StoreListParams = {}) {
  return useQuery({
    queryKey: [queryKeys.STORE, params],
    queryFn: () => getStoreList(params),
  });
}

function useGetStoreDetail(storeId: number, queryOptions?: UseQueryCustomOptions<StoreDetail>) {
  return useQuery({
    queryKey: [queryKeys.STORE, queryKeys.GET_STORE_DETAIL, storeId], // storeId queryKey에서 제외: 항상 한 개의 데이터만 유지
    queryFn: () => getStoreDetail(storeId),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
    ...queryOptions,
  });
}

function useGetMenuDetail(
  storeId: number,
  menuId: number,
  queryOptions?: UseQueryCustomOptions<MenuDetail>
) {
  return useQuery({
    queryKey: [queryKeys.STORE, queryKeys.GET_MENU_DETAIL, storeId, menuId],
    queryFn: () => getMenuDetail(storeId, menuId),
    ...queryOptions,
  });
}

export type BaseFilters = Pick<StoreListParams, 'category' | 'keyword' | 'sort' | 'limit'>;
type PageParam = { cursorId: number; direction: boolean };

function useInfiniteStoreList(
  filters: BaseFilters
): UseInfiniteQueryResult<InfiniteData<StoreListResponse>, Error> {
  const limit = filters.limit ?? 15;

  return useInfiniteQuery<
    StoreListResponse,
    Error,
    InfiniteData<StoreListResponse>,
    [string, BaseFilters],
    PageParam
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

    staleTime: 60_000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

function useStore(storeId?: number, menuId?: number) {
  const storeListQuery = useGetStoreList();
  const storeDetailQuery = useGetStoreDetail(storeId!);
  const menuDetailQuery = useGetMenuDetail(storeId!, menuId!);

  return {
    storeListQuery,
    storeDetailQuery,
    menuDetailQuery,
    useInfiniteStoreList,
  };
}

export default useStore;
