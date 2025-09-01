import axiosInstance from './axios';
import { History } from '@/types/domain';

export interface OrderListResponse {
  prevCursor: number;
  nextCursor: number;
  orders: History[] | null;
}

export interface OrderMenu {
  name: string;
  quality: number;
  totalAmount: number;
}

export interface OrderDetailResponse {
  storeName: string;
  orderNumber: string;
  requestedAt: string;
  menus: OrderMenu[];
  totalAmount: number;
  paymentMethod: string;
  memberName: string;
  memberNumber: string;
  pickupDueTime: string;
}

export interface GetOrderRequest {
  menuId: number;
  quantity: number;
}

export const getOrders = async (cursor?: number, keyword?: string): Promise<OrderListResponse> => {
  const { data } = await axiosInstance.get('/orders/list', {
    params: { cursor, keyword },
  });
  return data.data;
};

export const getOrderDetail = async (
  orderId: number,
  params?: GetOrderRequest
): Promise<OrderDetailResponse> => {
  const { data } = await axiosInstance.get(`/orders/${orderId}`, {
    params,
  });
  return data.data;
};
