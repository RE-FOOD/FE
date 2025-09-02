import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { getNotificationList, NotiResponse } from '@/api/notification';
import { queryKeys } from '@/constants/keys';

export const useNotification = () => {
  return useInfiniteQuery<
    NotiResponse, // queryFnData (API 응답 1페이지)
    Error, // error 타입
    InfiniteData<NotiResponse>, // data 타입 👈 여기!
    [string], // queryKey
    number // pageParam
  >({
    queryKey: [queryKeys.NOTIFICATION],
    queryFn: () => getNotificationList(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextCursor == null) return undefined;
      if (lastPage.list.length === 0) return undefined;
      return lastPage.nextCursor;
    },
  });
};
