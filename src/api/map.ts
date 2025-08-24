import axiosInstance from './axios';
import { Map } from '@/types/domain';

type GetNearbyStoresRequest = Pick<Map, 'latitude' | 'longitude'> & {
  radiusKm?: number;
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

export default map;
