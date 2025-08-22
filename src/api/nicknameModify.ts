import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { UpdateNicknameData, UpdateNicknameRequest } from '@/types/domain';

function nicknameModify(req: UpdateNicknameRequest) {
  return axiosInstance.patch<ApiResponse<UpdateNicknameData>>('/members/nickname', req);
}

export { nicknameModify };
