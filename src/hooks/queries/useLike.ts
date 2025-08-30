import { useMutation, useQueryClient, useInfiniteQuery, QueryKey } from '@tanstack/react-query';
import {
  toggleFavorite,
  FavoriteResponse,
  fetchMyLikes,
  type GetFavoriteParams,
  type MyLikePage,
} from '@/api/like';
import { ResponseError, UseMutationCustomOptions } from '@/types/api';

const useToggleFavorite = (options?: UseMutationCustomOptions<FavoriteResponse, number>) => {
  const queryClient = useQueryClient();

  return useMutation<FavoriteResponse, ResponseError, number>({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['like', data.dataId],
      });
      queryClient.invalidateQueries({ queryKey: ['likes', 'me'] });
    },
    ...options,
  });
};

export function useMyLikesInfinite(params?: Omit<GetFavoriteParams, 'cursorId'>) {
  return useInfiniteQuery<MyLikePage, ResponseError, MyLikePage, QueryKey, number | null>({
    queryKey: ['likes', 'me', params?.sort, params?.limit],
    queryFn: ({ pageParam }) => fetchMyLikes({ ...params, cursorId: pageParam }),
    initialPageParam: null,
    getNextPageParam: (last) => (last.hasNext ? last.nextCursor : undefined),
    getPreviousPageParam: (last) => (last.hasPrev ? last.prevCursor : undefined),
  });
}

export function useMyLikesFlat(params?: Omit<GetFavoriteParams, 'cursorId'>) {
  const q = useMyLikesInfinite(params);
  const stores = q.data ? q.data.pages.flatMap((p: MyLikePage) => p.stores) : [];
  return { ...q, stores };
}

export default useToggleFavorite;
