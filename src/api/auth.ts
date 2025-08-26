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
  address: string;
  roadAddress: string;
};

const kakaoSignup = async ({
  kakaoAccessToken,
  phone,
  nickname,
  address,
  roadAddress,
}: RequestMember): Promise<void> => {
  const { data } = await axiosInstance.post('/auth/signup/members', {
    accessToken: kakaoAccessToken,
    phone,
    nickname,
    address,
    roadAddress,
  });
  return data;
};

type RequestSeller = {
  kakaoAccessToken: string | undefined;
  phone: string;
  businessNumber: string;
};

const sellerSignup = async ({ kakaoAccessToken, phone, businessNumber }: RequestSeller) => {
  const { data } = await axiosInstance.post('/auth/signup/stores', {
    accessToken: kakaoAccessToken,
    businessLicenseNumber: businessNumber,
    phone,
  });
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
  fcmToken: string;
};

const getProfile = async (): Promise<Profile> => {
  const { data } = await axiosInstance.get('/members/profile');
  console.log(data);
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const { data } = await axiosInstance.post('/auth/refresh', {
    refreshToken,
  });
  console.log(data.data);
  return data.data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export { kakaoLogin, kakaoSignup, sellerSignup, getProfile, getAccessToken, logout };
