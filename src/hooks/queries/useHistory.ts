import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  GetOrderRequest,
  getOrders,
  OrderListResponse,
  OrderDetailResponse,
  getOrderDetail,
} from '@/api/history';

import { History } from '@/types/domain';

export const useInfiniteHistory = (keyword: string) => {
  return useInfiniteQuery<
    OrderListResponse,
    Error,
    History[],
    [string, string],
    number | undefined
  >({
    queryKey: ['orders', keyword],
    queryFn: ({ pageParam }) => getOrders(pageParam, keyword),
    getNextPageParam: (lastPage) =>
      lastPage?.nextCursor != null ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,
    select: (data) => data.pages.flatMap((page) => page.orders ?? []),
  });
};

export const useOrderDetail = (orderId: number, params?: GetOrderRequest) => {
  return useQuery<OrderDetailResponse, Error>({
    queryKey: ['orderDetail', orderId, params],
    queryFn: () => getOrderDetail(orderId, params),
    enabled: !!orderId,
  });
};
