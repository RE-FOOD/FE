import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';
import { Mypage } from '@/types/domain';

export type UpdateNicknameRequest = Pick<Mypage, 'nickname'>;
export type UpdateNicknameData = Pick<Mypage, 'id' | 'nickname'>;

const getMyPage = async () => {
  const { data } = await axiosInstance.get<ApiResponse<Mypage>>('/mypage/main');
  return data;
};

function nicknameModify(req: UpdateNicknameRequest) {
  return axiosInstance.patch<ApiResponse<UpdateNicknameData>>('/members/nickname', req);
}

export { getMyPage, nicknameModify };
