import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Mypage } from '@/types/domain';

const getMyPage = async () => {
  const { data } = await axiosInstance.get<ApiResponse<Mypage>>('/mypage/main');
  return data;
};

export { getMyPage };
