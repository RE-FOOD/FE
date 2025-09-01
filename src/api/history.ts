import axiosInstance from './axios';
import { History } from '@/types/domain';

export interface OrderListResponse {
  prevCursor: number;
  nextCursor: number;
  orders: History[] | null;
}

export const getOrders = async (cursor?: number, keyword?: string): Promise<OrderListResponse> => {
  const { data } = await axiosInstance.get('/orders/list', {
    params: { cursor, keyword },
  });
  return data.data;
};
