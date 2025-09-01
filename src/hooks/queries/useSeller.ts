import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import { getStoreInsight } from '@/api/seller';
import { queryKeys } from '@/constants/keys';
import { UseQueryCustomOptions } from '@/types/api';

function useGetStoreInsight(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryFn: getStoreInsight,
    queryKey: [queryKeys.SELLER, queryKeys.GET_STORE_INSIGHT],
    ...queryOptions,
  });
}

function useSeller() {
  const { isSeller } = useAuth();
  const storeInsightQuery = useGetStoreInsight({ enabled: isSeller });

  return {
    isSeller,
    storeInsightQuery,
  };
}

export default useSeller;
