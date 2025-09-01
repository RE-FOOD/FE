import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { StoreInsight } from '@/types/domain';

const getStoreInsight = async (): Promise<StoreInsight> => {
  const { data } = await axiosInstance.get<ApiResponse<StoreInsight>>('/stores/mypage');
  console.log(data);
  return data.data;
};

export { getStoreInsight };
