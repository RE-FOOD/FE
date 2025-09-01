import axiosInstance from './axios';
import { SellerOrder } from '@/types/domain';

export interface SellerOrderListResponse {
  data: SellerOrder[];
}

export const getSellerOrders = async (cursorId?: number) => {
  try {
    const { data } = await axiosInstance.get('/orders/list', {
      params: cursorId ? { cursorId } : {},
    });
    return data.data;
  } catch (err: any) {
    throw err;
  }
};

export const approveSellerOrder = async (orderId: number): Promise<void> => {
  await axiosInstance.get<{ data: null }>(`/stores/orders/${orderId}/success`);
};

export const failSellerOrder = async (orderId: number): Promise<void> => {
  await axiosInstance.get<{ data: null }>(`/stores/orders/${orderId}/fail`);
};
