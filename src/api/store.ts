import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Menu, Store, StoreCategory, StoreSort, StoreDetail, StoreReview } from '@/types/domain';

export type OverviewResponse = {
  cartCount: number;
  notifications: boolean;
};

export type StoreListParams = {
  category?: StoreCategory | null;
  keyword?: string | null;
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

const getStoreList = async ({
  category = null,
  keyword = null,
  sort = 'NEAR',
  cursorId = 0,
  direction = true,
  limit = 15,
}: StoreListParams) => {
  const res = await axiosInstance.get<ApiResponse<StoreListResponse>>('/stores', {
    params: {
      category: category ?? undefined,
      keyword: keyword ?? undefined,
      sort: sort,
      cursorId,
      direction,
      limit,
    },
  });
  return res.data.data;
};

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

export type ToggleStoreResponse = {
  storeId: number;
  isFavored: boolean;
};

const toggleStoreLike = async (storeId: number) => {
  const res = await axiosInstance.patch<ApiResponse<ToggleStoreResponse>>(
    `/stores/${storeId}/favorites`
  );
  return res.data;
};

export type StoreReviewResponse = {
  prevCursor: number;
  nextCursor: number;
  list: StoreReview[];
};

const getStoreReviews = async (storeId: number) => {
  const res = await axiosInstance.get<ApiResponse<StoreReviewResponse>>(
    `/stores/${storeId}/reviews`
  );
  return res.data.data;
};

export { getStoreList, getStoreDetail, getMenuDetail, toggleStoreLike, getStoreReviews };
