import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { approveSellerOrder, getSellerOrders, failSellerOrder } from '@/api/seller';
import { SellerOrder } from '@/types/domain';

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
