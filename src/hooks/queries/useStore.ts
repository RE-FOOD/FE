import { useQuery } from '@tanstack/react-query';
import { getMenuDetail, getStoreDetail, MenuDetail } from '@/api/store';
import { queryKeys } from '@/constants/keys';
import { UseQueryCustomOptions } from '@/types/api';
import { StoreDetail } from '@/types/domain';

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

function useStore(storeId: number, menuId?: number) {
  const storeDetailQuery = useGetStoreDetail(storeId);
  const menuDetailQuery = useGetMenuDetail(storeId, menuId!);

  return {
    storeDetailQuery,
    menuDetailQuery,
  };
}

export default useStore;
