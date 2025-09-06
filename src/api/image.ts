// api/image.ts
import axiosInstance from './axios';
import { ApiResponse } from '@/types/api';

export interface PostImageResponse {
  preSignedUrl: string;
  imageKey: string[] | Record<string, string>;
}

export const postImage = async (fileName: string): Promise<ApiResponse<PostImageResponse>> => {
  const res = await axiosInstance.post<ApiResponse<PostImageResponse>>(
    '/images',
    { fileName }, // ✅ JSON body
    { headers: { 'Content-Type': 'application/json' } }
  );

  console.log('[postImage] 응답:', res.data);
  return res.data;
};
