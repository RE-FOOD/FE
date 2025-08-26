import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Like, StoreSortOption } from '@/types/domain';

interface GetFavoriteParams {
  sort: StoreSortOption;
  cursorId: number;
}
export interface FavoriteResponse {
  dataId: number;
  isFavored: boolean;
}

export const like = async ({ sort, cursorId }: GetFavoriteParams): Promise<ApiResponse<Like[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<Like[]>>('/stores/favorites/me', {
    params: {
      sort,
      ...(cursorId && { cursorId }),
    },
  });
  return data;
};

export const toggleFavorite = async (storeId: number): Promise<FavoriteResponse> => {
  const res = await axiosInstance.post<FavoriteResponse>(`/favorites/${storeId}`, {});
  return res.data;
};
