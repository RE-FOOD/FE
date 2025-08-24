import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Menu, Store, StoreCategory, StoreSort, StoreDetail } from '@/types/domain';

export type StoreListParams = {
  category?: StoreCategory | null;
  keyWord?: string | null;
  sort?: StoreSort | null;
  cursorId?: number;
  direction?: boolean;
  limit?: number;
};

export type StoreListResponse = {
  prevCursor: number | null;
  nextCursor: number | null;
  stores: Store[];
};

export const getStoreList = async ({
  category = null,
  keyWord = null,
  sort = 'NEAR',
  cursorId = 0,
  direction = true,
  limit = 15,
}: StoreListParams) => {
  const res = await axiosInstance.get<ApiResponse<StoreListResponse>>('/stores', {
    params: {
      category: category ?? null,
      keyWord: keyWord ?? null,
      sort: sort ?? null,
      cursorId,
      direction,
      limit,
    },
  });
  console.log(res.data);
  return res.data.data;
};

export const getStoreDetail = async (storeId: number) => {
  const res = await axiosInstance.get<ApiResponse<StoreDetail>>(`/stores/${storeId}`);
  return res.data.data;
};

export interface MenuDetail extends Menu {
  info: string;
}

export const getMenuDetail = async (storeId: number, menuId: number) => {
  const res = await axiosInstance.get<ApiResponse<MenuDetail>>(
    `/stores/${storeId}/menus/${menuId}`
  );
  return res.data.data;
};
