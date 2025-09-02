import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Notification } from '@/types/domain';

export type NotiResponse = {
  prevCursor: number;
  nextCursor: number;
  list: Notification[];
};

const getNotificationList = async (): Promise<NotiResponse> => {
  const res = await axiosInstance.get<ApiResponse<NotiResponse>>('/notifications/me', {
    // params: {
    //   cursorId,
    // },
  });
  console.log(res.data);
  return res.data.data;
};

export { getNotificationList };
