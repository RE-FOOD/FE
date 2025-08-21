import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { LocationFull } from '@/types/domain';

const getLocations = async (): Promise<LocationFull[]> => {
  const { data } = await axiosInstance.get<ApiResponse<LocationFull[]>>('/addresses');
  console.log(data);
  return data.data;
};

const addLocation = async (address: string, roadAddress: string) => {
  const { data } = await axiosInstance.post('/addresses', {
    address,
    roadAddress,
  });
  return data;
};

const deleteLocation = async (locationId: number) => {
  const { data } = await axiosInstance.delete(`/addresses/${locationId}`);
  return data;
};

const setDefaultLocation = async (locationId: number) => {
  const { data } = await axiosInstance.patch(`/addresses/${locationId}/setDefault`);
  return data;
};

export { getLocations, addLocation, deleteLocation, setDefaultLocation };
