import { useQuery } from '@tanstack/react-query';
import { checkNickname, getOverviews } from '@/api/member';
import { queryKeys } from '@/constants/keys';
import { ApiResponse, UseQueryCustomOptions } from '@/types/api';

function useGetOverviews() {
  return useQuery({
    queryKey: [queryKeys.MEMBER, queryKeys.GET_OVERVIEWS],
    queryFn: () => getOverviews(),
  });
}

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

export { useGetOverviews, useCheckNickname };
