import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { LocationFull } from '@/types/domain';

const getLocations = async (): Promise<LocationFull[]> => {
  const { data } = await axiosInstance.get<ApiResponse<LocationFull[]>>('/addresses');
  return data.data;
};

const addLocation = async (address: string, roadAddress: string): Promise<LocationFull> => {
  const { data } = await axiosInstance.post<ApiResponse<LocationFull>>('/addresses', {
    address,
    roadAddress,
  });
  return data.data;
};

const deleteLocation = async (locationId: number): Promise<void> => {
  await axiosInstance.delete(`/addresses/${locationId}`);
};

const setDefaultLocation = async (locationId: number): Promise<LocationFull> => {
  const { data } = await axiosInstance.patch<ApiResponse<LocationFull>>(
    `/addresses/${locationId}/setDefault`
  );
  return data.data;
};

export { getLocations, addLocation, deleteLocation, setDefaultLocation };
