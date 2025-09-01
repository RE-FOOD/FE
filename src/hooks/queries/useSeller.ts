import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  approveSellerOrder,
  getSellerOrders,
  SellerOrderListResponse,
  failSellerOrder,
} from '@/api/seller';
import { SellerOrder } from '@/types/domain';

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
