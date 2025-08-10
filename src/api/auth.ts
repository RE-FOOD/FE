import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

const kakaoLogin = async (accessToken: string): Promise<ResponseToken> => {
  console.log(`start kakaoLogin`);
  const { data } = await axiosInstance.post('/auth/login/members', { accessToken });
  console.log(data);
  return data;
};

const kakaoSignup = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post('/auth/signup/members', {
    email,
    password,
  });
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const getProfile = async () => {};

export { kakaoLogin, kakaoSignup, getProfile };
