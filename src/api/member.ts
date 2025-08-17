import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';

const checkNickname = async (nickname: string) => {
  const { data } = await axiosInstance.get<ApiResponse<boolean>>('/members/check/nickname', {
    params: { nickname },
  });
  return data;
};

export { checkNickname };
