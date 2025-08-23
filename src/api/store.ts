import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Menu, StoreDetail } from '@/types/domain';

const getStoreDetail = async (storeId: number) => {
  const res = await axiosInstance.get<ApiResponse<StoreDetail>>(`/stores/${storeId}`);
  return res.data.data;
};

export interface MenuDetail extends Menu {
  info: string;
}

const getMenuDetail = async (storeId: number, menuId: number) => {
  const res = await axiosInstance.get<ApiResponse<MenuDetail>>(
    `/stores/${storeId}/menus/${menuId}`
  );
  return res.data.data;
};

export { getStoreDetail, getMenuDetail };
