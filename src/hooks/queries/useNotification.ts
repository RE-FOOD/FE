import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { getNotificationList, NotiResponse } from '@/api/notification';
import { queryKeys } from '@/constants/keys';

export const useNotification = () => {
  return useInfiniteQuery<NotiResponse, Error, InfiniteData<NotiResponse>, [string], number>({
    queryKey: [queryKeys.NOTIFICATION],
    queryFn: () => getNotificationList(),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nextCursor == null) return undefined;
      if (lastPage.list.length < 15) return undefined;

      const prevPage = allPages[allPages.length - 2];
      if (prevPage && prevPage.nextCursor === lastPage.nextCursor) return undefined;

      return lastPage.nextCursor;
    },
  });
};
