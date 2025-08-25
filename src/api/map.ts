import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Map } from '@/types/domain';

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

export default { map, storeSummary };
export type { StoreSummary };
