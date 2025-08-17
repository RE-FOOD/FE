import { useQuery } from '@tanstack/react-query';
import { checkNickname } from '@/api/member';
import { ApiResponse, UseQueryCustomOptions } from '@/types/api';

function useCheckNickname(
  nickname: string,
  queryOptions?: UseQueryCustomOptions<ApiResponse<boolean>>
) {
  return useQuery({
    queryKey: ['member', 'checkNickname', nickname],
    queryFn: () => checkNickname(nickname),
    retry: false,
    ...queryOptions,
  });
}

export { useCheckNickname };
