import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import { getMyPage, nicknameModify, UpdateNicknameRequest } from '@/api/mypage';
import { ApiResponse } from '@/types/api';
import type { Mypage } from '@/types/domain';

function useMyPage() {
  const { isLogin } = useAuth();
  return useQuery<ApiResponse<Mypage>>({
    queryKey: ['mypage', 'main'],
    queryFn: getMyPage,
    enabled: isLogin,
    staleTime: 5 * 60 * 1000,
  });
}

function useUpdateNickname() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateNicknameRequest) => nicknameModify(body),
    onMutate: async (body) => {
      await queryClient.cancelQueries({ queryKey: ['mypage', 'main'] });
      const prev = queryClient.getQueryData<ApiResponse<Mypage>>(['mypage', 'main']);

      queryClient.setQueryData<ApiResponse<Mypage>>(['mypage', 'main'], (old) => {
        if (!old) return undefined;
        if (!body.nickname) return old;
        return {
          ...old,
          data: {
            ...old.data,
            nickname: body.nickname,
          },
        };
      });

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) queryClient.setQueryData(['mypage', 'main'], context.prev);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage', 'main'] });
    },
  });
}

export { useMyPage, useUpdateNickname };
