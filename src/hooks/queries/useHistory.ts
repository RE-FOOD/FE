import { useInfiniteQuery } from '@tanstack/react-query';
import { getOrders, OrderListResponse } from '@/api/history';

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
    select: (data) => data.pages.flatMap((page) => page.orders ?? []), // null → 빈 배열 처리
  });
};
