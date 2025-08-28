import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Cart } from '@/types/domain';

const getCarts = async () => {
  const res = await axiosInstance.get<ApiResponse<Cart>>('/carts');
  return res.data.data;
};

type CheckCartStoreResponse = ApiResponse<string> & {
  httpStatus: number;
};

const checkCartStore = async (storeId: number): Promise<CheckCartStoreResponse> => {
  const res = await axiosInstance.get<ApiResponse<string>>(`/carts/check?storeId=${storeId}`, {
    // 200: 동일 가게 데이터 존재, 201: 장바구니 데이터 없음, 409: 다른 가게 존재
    validateStatus: (status) => [200, 201, 409].includes(status),
  });

  return {
    httpStatus: res.status,
    ...res.data,
  };
};

export type AddMenuRequest = {
  checkNew: boolean; // 새로운 가게인지 여부
  storeId: number;
  menuId: number;
  quantity: number;
};

const addMenuToCart = async (data: AddMenuRequest) => {
  const res = await axiosInstance.post<ApiResponse<string>>(`/carts`, data);
  return res.data;
};

export type UpdateCartRequest = {
  id: number; // storeId
  menus: {
    id: number; // menuId
    quantity: number; // 수량 (삭제 시 0)
  }[];
};

const updateCartItem = async (data: UpdateCartRequest) => {
  const res = await axiosInstance.put<ApiResponse<string>>(`/carts`, data);
  return res.data;
};

export { getCarts, checkCartStore, addMenuToCart, updateCartItem };
