import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { StoreDetail } from '@/types/domain';

const getStoreDetail = async (storeId: number) => {
  const res = await axiosInstance.get<ApiResponse<StoreDetail>>(`/stores/${storeId}`);
  return res.data.data;
};

export { getStoreDetail };
