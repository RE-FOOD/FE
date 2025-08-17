import axiosInstance from './axios';
import { Profile } from '@/types/domain';
import { getEncryptStorage } from '@/utils/encryptStorage';

type requestLogin = {
  accessToken: string;
  fcmToken: string;
};

const kakaoLogin = async ({ accessToken, fcmToken }: requestLogin): Promise<ResponseToken> => {
  const res = await axiosInstance.post('/auth/login/members', { accessToken, fcmToken });
  return res.data.data;
};

type RequestMember = {
  kakaoAccessToken: string | undefined;
  phone: string;
  nickname: string;
  region: string;
};

const kakaoSignup = async ({
  kakaoAccessToken,
  phone,
  nickname,
  region,
}: RequestMember): Promise<void> => {
  const body = {
    accessToken: kakaoAccessToken,
    phone,
    nickname,
    address: region,
  };
  console.log('signup body →', JSON.stringify(body));
  const { data } = await axiosInstance.post('/auth/signup/members', {
    accessToken: kakaoAccessToken,
    phone,
    nickname,
    address: region,
  });
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
  fcmToken: string;
};

const getProfile = async (): Promise<Profile> => {
  console.log(`프로필 조회 시작`);
  const { data } = await axiosInstance.get('/members/profile');
  console.log(`프로필 조회: ${data}`);
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const { data } = await axiosInstance.post('/auth/refresh', {
    refreshToken,
  });
  return data.data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export { kakaoLogin, kakaoSignup, getProfile, getAccessToken, logout };
