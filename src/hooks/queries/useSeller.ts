import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import {
  registerMenu,
  MenuRegisterRequest,
  approveSellerOrder,
  getSellerOrders,
  failSellerOrder,
  getStoreInsight,
} from '@/api/seller';

import { queryKeys } from '@/constants/keys';
import {
  ResponseError,
  UseQueryCustomOptions,
  ApiResponse,
  UseMutationCustomOptions,
} from '@/types/api';
import { StoreInsight, SellerOrder } from '@/types/domain';

export const useSellerOrders = (status: 'PENDING' | 'COMPLETED') => {
  type SellerOrdersFlat = SellerOrder[];

  return useInfiniteQuery<
    SellerOrder[],
    Error,
    SellerOrdersFlat,
    ['sellerOrders', typeof status],
    number | undefined
  >({
    queryKey: ['sellerOrders', status],
    queryFn: ({ pageParam }) => getSellerOrders(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      const lastOrder = lastPage[lastPage.length - 1];
      return lastOrder ? lastOrder.orderId : undefined;
    },
    select: (data) => data.pages.flatMap((p) => p),
  });
};

export const useApproveOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (orderId: number) => approveSellerOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerOrders'] });
    },
    onError: () => {
      console.error('주문 승인 실패');
    },
  });
};

export const useFailOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: failSellerOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerOrders'] });
    },
    onError: () => {
      console.error('주문 거절 실패');
    },
  });
};

export const useRegisterMenu = (
  storeId: number,
  options?: UseMutationCustomOptions<ApiResponse<null>, MenuRegisterRequest>
) => {
  return useMutation<ApiResponse<null>, ResponseError, MenuRegisterRequest>({
    mutationFn: (payload: MenuRegisterRequest) => registerMenu(storeId, payload),
    ...options,
  });
};

function useGetStoreInsight(queryOptions?: UseQueryCustomOptions<StoreInsight, StoreInsight>) {
  return useQuery<StoreInsight, ResponseError, StoreInsight>({
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
