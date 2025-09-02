import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { SellerOrder, StoreInsight } from '@/types/domain';

export interface SellerOrderListResponse {
  data: SellerOrder[];
}

export const getSellerOrders = async (cursorId?: number) => {
  const { data } = await axiosInstance.get('/stores/orders', {
    params: cursorId ? { cursorId } : {},
  });

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (Array.isArray(data.items)) {
    return data.items;
  }
  return [];
};

export const approveSellerOrder = async (orderId: number): Promise<void> => {
  await axiosInstance.get<{ data: null }>(`/stores/orders/${orderId}/success`, {});
};

export const failSellerOrder = async (orderId: number): Promise<void> => {
  await axiosInstance.get<{ data: null }>(`/stores/orders/${orderId}/fail`, {});
};

const getStoreInsight = async (): Promise<StoreInsight> => {
  const { data } = await axiosInstance.get<ApiResponse<StoreInsight>>('/stores/mypage');
  console.log(data);
  return data.data;
};

export { getStoreInsight };
