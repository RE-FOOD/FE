import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Like, StoreSortOption } from '@/types/domain';

export interface GetFavoriteParams {
  sort?: StoreSortOption;
  cursorId?: number | null;
  limit?: number;
}
export interface FavoriteResponse {
  storeId: number;
  isFavored: boolean;
}

export type LikeList = Pick<
  Like,
  'id' | 'name' | 'status' | 'ratingAvg' | 'count' | 'distance' | 'salePercent' | 'imageUrl'
> & {
  isFavored: boolean;
};

export type MyLikePage = {
  pages: MyLikePage[];
  prevCursor: number | null;
  nextCursor: number | null;
  hasPrev: boolean;
  hasNext: boolean;
  stores: LikeList[];
};

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
  const res = await axiosInstance.patch<ApiResponse<FavoriteResponse>>(
    `/stores/${storeId}/favorites`,
    {}
  );
  return res.data.data;
};

export async function fetchMyLikes(params?: GetFavoriteParams): Promise<MyLikePage> {
  const res = await axiosInstance.get<ApiResponse<MyLikePage>>('/stores/favorites/me', {
    params: {
      sort: params?.sort,
      cursorId: params?.cursorId ?? undefined,
      limit: params?.limit ?? undefined,
    },
  });
  return res.data.data;
}
