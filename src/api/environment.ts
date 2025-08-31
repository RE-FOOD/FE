import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';

export type ReportResponse = {
  orderCount: number;
  dishCount: number;
  totalTreesSaved: number;
  totalCarbonSaved: number;
};

const getReport = async (): Promise<ReportResponse> => {
  const { data } = await axiosInstance.get<ApiResponse<ReportResponse>>('/environment/reports');
  console.log(data);
  return data.data;
};

export { getReport };
