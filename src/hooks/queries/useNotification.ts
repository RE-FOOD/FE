import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { getNotificationList, NotiResponse } from '@/api/notification';
import { queryKeys } from '@/constants/keys';

export const useNotification = () => {
  return useInfiniteQuery<NotiResponse, Error, InfiniteData<NotiResponse>, [string], number>({
    queryKey: [queryKeys.NOTIFICATION],
    queryFn: ({ pageParam = 0 }) => getNotificationList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextCursor == null) return undefined;
      if (lastPage.list.length === 0) return undefined;
      return lastPage.nextCursor;
    },
  });
};
