import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Map, StoreSortOption } from '@/types/domain';

type GetNearbyStoresRequest = Pick<Map, 'latitude' | 'longitude'> & {
  radiusKm?: number;
};
type StoreSummary = Pick<Map, 'id' | 'name' | 'status' | 'maxPercent'> & {
  imageUrl: string;
  pickupTime: string;
  distance: number;
  rating: number;
  reviewCount: number;
  address: string;
};

type GetSortedStoreRequest = Pick<Map, 'latitude' | 'longitude'> & {
  radiusKm?: number;
  sort?: StoreSortOption;
  cursorId: number | null;
  limit?: number;
};

type StoreListItem = Pick<Map, 'id' | 'name'> & {
  status?: 'OPEN' | 'CLOSED';
  imageUrl: string;
  distance: number;
  rating: number;
  reviewCount: number;
  category: string;
  maxPercent: number;
};

type PaginatedStoresResponse = {
  stores: StoreListItem[];
  cursorId: number;
  prevCursor: number;
  nextCursor: number;
  hasNext: boolean;
};

const map = async (request: GetNearbyStoresRequest): Promise<Map[]> => {
  const { latitude, longitude, radiusKm = 5.0 } = request;

  try {
    const response = await axiosInstance.get<{ data: Map[] }>('/maps/markers', {
      params: {
        latitude,
        longitude,
        radiusKm,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch nearby stores:', error);
    throw error;
  }
};

const storeSummary = async (
  storeId: number,
  latitude: number,
  longitude: number
): Promise<ApiResponse<StoreSummary>> => {
  const { data } = await axiosInstance.get<ApiResponse<StoreSummary>>(`/maps/${storeId}/summary`, {
    params: { latitude, longitude },
  });
  return data;
};

const getSortedStores = async (
  request: GetSortedStoreRequest
): Promise<ApiResponse<PaginatedStoresResponse>> => {
  const {
    latitude,
    longitude,
    radiusKm = 5.0,
    sort = 'NEAR',
    cursorId = null,
    limit = 10,
  } = request;
  try {
    const params: {
      latitude: number;
      longitude: number;
      radiusKm: number;
      sort: StoreSortOption;
      limit: number;
      cursorId?: number;
    } = { latitude, longitude, radiusKm, sort, limit };
    if (cursorId != null) params.cursorId = cursorId;

    if (cursorId !== null && cursorId !== undefined) {
      params.cursorId = cursorId;
    }

    const response = await axiosInstance.get<ApiResponse<PaginatedStoresResponse>>('/maps/lists', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sorted stores:', error);
    throw error;
  }
};

export default { map, storeSummary, getSortedStores };
export type {
  StoreSummary,
  StoreSortOption,
  GetSortedStoreRequest,
  StoreListItem,
  PaginatedStoresResponse,
  GetNearbyStoresRequest,
};
