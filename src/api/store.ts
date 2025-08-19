import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';

type Menu = {
  id: string;
  name: string;
  price: number;
  dailyDiscountPercent: number;
  discountPrice: number;
  dailyQuantity: number;
  imageUrl: string;
};

type ResponseStoreDetail = {
  name: string;
  phoneNumber: string;
  address: string;
  description: string;
  origin: string;
  openTime: string;
  closeTime: string;
  category: string;
  latitude: number;
  longitude: number;
  imageUrl: string[];
  menus: Menu[];
  like: boolean;
  ratingAvg: number;
  count: number;
};

const getStoreDetail = async (storeId: number) => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseStoreDetail>>('/stores', {
    params: { storeId },
  });
  return data;
};

export { getStoreDetail };
