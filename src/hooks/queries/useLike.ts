import { useMutation, useQueryClient, useInfiniteQuery, QueryKey } from '@tanstack/react-query';
import {
  toggleFavorite,
  FavoriteResponse,
  fetchMyLikes,
  type GetFavoriteParams,
  type MyLikePage,
} from '@/api/like';
import { StoreSummary } from '@/api/map';
import { ApiResponse, ResponseError, UseMutationCustomOptions } from '@/types/api';

const useToggleFavorite = (options?: UseMutationCustomOptions<FavoriteResponse, number>) => {
  const queryClient = useQueryClient();

  return useMutation<FavoriteResponse, ResponseError, number>({
    mutationFn: toggleFavorite,

    onMutate: async (storeId) => {
      await queryClient.cancelQueries({ queryKey: ['likes', 'me'] });

      const prevData = queryClient.getQueryData<{
        pages: MyLikePage[];
        pageParams: (number | null)[];
      }>(['likes', 'me']);

      if (prevData) {
        queryClient.setQueryData(['likes', 'me'], {
          ...prevData,
          pages: prevData.pages.map((page) => ({
            ...page,
            stores: page.stores.map((s) =>
              s.id === storeId ? { ...s, isFavored: !s.isFavored } : s
            ),
          })),
        });
      }

      return { prevData };
    },

    onSuccess: (data, storeId) => {
      const keys = queryClient
        .getQueryCache()
        .getAll()
        .map((q) => q.queryKey)
        .filter((key) => Array.isArray(key) && key[0] === 'storeSummary' && key[1] === storeId);

      keys.forEach((key) => {
        queryClient.setQueryData<ApiResponse<StoreSummary>>(key, (old) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              isFavored: data.isFavored,
            },
          };
        });
      });
    },

    onSettled: () => {
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
