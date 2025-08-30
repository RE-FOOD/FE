import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { EnvironmentLevel, Order } from '@/types/domain';

const getOrder = async (): Promise<Order> => {
  const res = await axiosInstance.get<ApiResponse<Order>>('/orders');
  return res.data.data;
};

interface CreateOrderPayload {
  pickupDueAt: string;
  reuse: boolean;
}

type ResponseOrder = string;

const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const res = await axiosInstance.post<ApiResponse<ResponseOrder>>('/orders', payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

interface RequestPayments {
  paymentKey: string;
  orderId: string;
  amount: number;
}

interface ResponsePayments {
  level: EnvironmentLevel;
  levelCheck: boolean;
}

const confirmPayment = async ({ paymentKey, orderId, amount }: RequestPayments) => {
  try {
    const res = await axiosInstance.post<ApiResponse<ResponsePayments>>('/payments/confirm', {
      paymentKey,
      orderId,
      amount,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export { getOrder, createOrder, confirmPayment };
