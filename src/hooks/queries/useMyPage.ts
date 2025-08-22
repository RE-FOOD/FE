import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import { getMyPage } from '@/api/mypage';
import { ApiResponse } from '@/types/api';
import { Mypage } from '@/types/domain';

function useMyPage() {
  const { isLogin } = useAuth();
  return useQuery<ApiResponse<Mypage>>({
    queryKey: ['mypage', 'main'],
    queryFn: getMyPage,
    enabled: isLogin,
    staleTime: 5 * 60 * 1000,
  });
}

export { useMyPage };
