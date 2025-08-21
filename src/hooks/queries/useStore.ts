import { useQuery } from '@tanstack/react-query';
import { getStoreDetail } from '@/api/store';
import { UseQueryCustomOptions } from '@/types/api';
import { StoreDetail } from '@/types/domain';

function useGetStoreDetail(storeId: number, queryOptions?: UseQueryCustomOptions<StoreDetail>) {
  return useQuery({
    queryKey: ['storeDetail', storeId], // storeId queryKey에서 제외: 항상 한 개의 데이터만 유지
    queryFn: () => getStoreDetail(storeId),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
    ...queryOptions,
  });
}

export { useGetStoreDetail };
