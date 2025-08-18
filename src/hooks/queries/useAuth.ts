import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAccessToken, getProfile, kakaoLogin, kakaoSignup } from '@/api/auth';
import queryClient from '@/api/queryClient';
import { numbers } from '@/constants/numbers';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/api';
import { Profile } from '@/types/domain';
import { removeEncryptStorage, setEncryptStorage } from '@/utils/encryptStorage';
import { removeHeader, setHeader } from '@/utils/header';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: kakaoSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: kakaoLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage('refreshToken', refreshToken);
      queryClient.fetchQuery({
        queryKey: ['auth', 'getAccessToken'],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    enabled: true,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader('Authorization', `Bearer ${data?.accessToken}`);
        await setEncryptStorage('refreshToken', data?.refreshToken);
      }
    })();
  }, [isSuccess, data?.accessToken, data?.refreshToken]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptStorage('refreshToken');
      }
    })();
  }, [isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: ['auth', 'getProfile'],
    ...queryOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const { isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, // 성공 시 프로필 반환
  });

  return { signupMutation, loginMutation, isLogin };
}

export default useAuth;
