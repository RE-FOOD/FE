import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  getAccessToken,
  getProfile,
  kakaoLogin,
  kakaoSignup,
  logout,
  sellerSignup,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import { queryKeys, storageKeys } from '@/constants/keys';
import { numbers } from '@/constants/numbers';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/api';
import { Profile } from '@/types/domain';
import { removeEncryptStorage, setEncryptStorage } from '@/utils/encryptStorage';
import { removeHeader, setHeader } from '@/utils/header';
import { showToast } from '@/utils/toast';

function useKakaoSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: kakaoSignup,
    ...mutationOptions,
  });
}

function useSellerSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: sellerSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: kakaoLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        showToast('error', '사업자 등록 승인 대기 중', '승인 이후 서비스 이용이 가능합니다.');
      }
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    enabled: true,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader('Authorization', `Bearer ${data?.accessToken}`);
        await setEncryptStorage(storageKeys.REFRESH_TOKEN, data?.refreshToken);
      }
    })();
  }, [isSuccess, data?.accessToken, data?.refreshToken]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      }
    })();
  }, [isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader('Authorization');
      await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const kakaoSignupMutation = useKakaoSignup();
  const sellerSignupMutation = useSellerSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const { data: profile, isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, // 토큰 갱신 성공 시 프로필 요청
  });
  const logoutMutation = useLogout();
  const isSeller = profile?.role === 'ROLE_STORE';

  return {
    kakaoSignupMutation,
    sellerSignupMutation,
    loginMutation,
    isLogin,
    isSeller,
    profile,
    logoutMutation,
  };
}

export default useAuth;
