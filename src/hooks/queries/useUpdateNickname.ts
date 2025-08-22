import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nicknameModify } from '@/api/nicknameModify';
import type { ApiResponse } from '@/types/api';
import type { UpdateNicknameRequest, Mypage } from '@/types/domain';

function useUpdateNickname() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateNicknameRequest) => nicknameModify(body),
    onMutate: async (body) => {
      await queryClient.cancelQueries({ queryKey: ['mypage', 'main'] });
      const prev = queryClient.getQueryData<ApiResponse<Mypage>>(['mypage', 'main']);

      queryClient.setQueryData<ApiResponse<Mypage>>(['mypage', 'main'], (old) => {
        if (!old) return undefined;
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

export { useUpdateNickname };
