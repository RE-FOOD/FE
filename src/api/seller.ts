import axios, { AxiosError } from 'axios';
import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { SellerOrder, StoreInsight } from '@/types/domain';

export interface SellerOrderListResponse {
  data: SellerOrder[];
}

export const getSellerOrders = async (cursorId?: number) => {
  try {
    const { data } = await axiosInstance.get('/orders/list', {
      params: cursorId ? { cursorId } : {},
    });
    return data.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err as AxiosError;
    }
    throw err;
  }
};

export const approveSellerOrder = async (orderId: number): Promise<void> => {
  await axiosInstance.get<{ data: null }>(`/stores/orders/${orderId}/success`);
};

export const failSellerOrder = async (orderId: number): Promise<void> => {
  await axiosInstance.get<{ data: null }>(`/stores/orders/${orderId}/fail`);
};

const getStoreInsight = async (): Promise<StoreInsight> => {
  const { data } = await axiosInstance.get<ApiResponse<StoreInsight>>('/stores/mypage');
  console.log(data);
  return data.data;
};

export { getStoreInsight };
