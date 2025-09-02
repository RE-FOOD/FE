import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import {
  approveSellerOrder,
  getSellerOrders,
  SellerOrderListResponse,
  failSellerOrder,
  getStoreInsight,
} from '@/api/seller';
import { queryKeys } from '@/constants/keys';
import { ResponseError, UseQueryCustomOptions } from '@/types/api';
import { StoreInsight, SellerOrder } from '@/types/domain';

export const useSellerOrders = () => {
  type SellerOrdersFlat = SellerOrder[];
  return useInfiniteQuery<
    SellerOrderListResponse,
    Error,
    SellerOrdersFlat,
    ['sellerOrders'],
    number | undefined
  >({
    queryKey: ['sellerOrders'],
    queryFn: async ({ pageParam }) => {
      return getSellerOrders(pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      const lastOrder = lastPage.data[lastPage.data.length - 1];
      return lastOrder ? lastOrder.orderId : undefined;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
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
