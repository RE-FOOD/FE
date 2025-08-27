import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Overviews } from '@/types/domain';

const checkNickname = async (nickname: string) => {
  const { data } = await axiosInstance.get<ApiResponse<boolean>>('/members/check/nickname', {
    params: { nickname },
  });
  return data;
};

interface OverviewResponse {
  statusCode: number;
  message: string;
  data: Overviews;
}

interface Overview extends OverviewResponse {
  locationLabel: string | undefined;
}

const getOverviews = async (): Promise<Overview> => {
  const res = await axiosInstance.get<ApiResponse<OverviewResponse['data']>>(
    '/members/me/overviews'
  );
  const payload: OverviewResponse = res.data;

  return {
    ...payload,
    locationLabel: payload.data.locations?.address,
  };
};

export { checkNickname, getOverviews };
