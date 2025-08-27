import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Order } from '@/types/domain';

const getOrder = async (): Promise<Order> => {
  const res = await axiosInstance.get<ApiResponse<Order>>('/order');
  return res.data.data;
};

export { getOrder };
