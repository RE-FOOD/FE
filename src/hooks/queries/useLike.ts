import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFavorite, FavoriteResponse } from '@/api/like';

import { ResponseError, UseMutationCustomOptions } from '@/types/api';

const useToggleFavorite = (options?: UseMutationCustomOptions<FavoriteResponse, number>) => {
  const queryClient = useQueryClient();

  return useMutation<FavoriteResponse, ResponseError, number>({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['like', data.dataId],
      });
    },
    ...options,
  });
};

export default useToggleFavorite;
