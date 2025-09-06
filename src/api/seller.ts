import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { SellerOrder, StoreInsight, Menu } from '@/types/domain';

export interface SellerOrderListResponse {
  data: SellerOrder[];
}

export interface MenuRegisterRequest extends Pick<Menu, 'name' | 'price' | 'dailyQuantity'> {
  info: string; // 메뉴 설명
  dailyDiscountPrice: number; // 할인 가격
  imageKey: string; // S3 업로드 이미지 키
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

export const registerMenu = async (
  storeId: number,
  payload: MenuRegisterRequest
): Promise<ApiResponse<null>> => {
  const { data } = await axiosInstance.post<ApiResponse<null>>(`/stores/${storeId}/menus`, payload);
  return data;
};

export { getStoreInsight };
