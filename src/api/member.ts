import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
// import { LocationFull } from '@/types/domain';

const checkNickname = async (nickname: string) => {
  const { data } = await axiosInstance.get<ApiResponse<boolean>>('/members/check/nickname', {
    params: { nickname },
  });
  return data;
};

// type OverviewLocation = Omit<LocationFull, 'roadAddress'>;

const getOverviews = async () => {
  const res = await axiosInstance.get('/members/me/overviews');
  const payload = res.data;

  return {
    ...payload,
    locations: payload.data.locations?.address,
  };
};

export { checkNickname, getOverviews };
