import axiosInstance from './axios';
import { Review } from '@/types/domain';

export type MyReviewResponse = Pick<Review, 'id' | 'rating' | 'content' | 'createdAt'> & {
  memberId: number;
  menuList: {
    id: number;
    name: string;
  }[];
};

export type CreateReviewRequest = Pick<Review, 'rating' | 'content'>;

export interface MyReviewsApiResponse {
  prevCursor: number;
  nextCursor: number;
  list: MyReviewResponse[];
}

export interface CreateReviewResponse {
  data: string;
}

export const getReview = async (cursor?: number): Promise<MyReviewsApiResponse> => {
  const params = cursor ? { cursor } : {};

  const response = await axiosInstance.get('/stores/reviews/me', {
    params,
  });
  return response.data.data;
};

export const createReview = async (
  storeId: number,
  orderId: number,
  body: CreateReviewRequest
): Promise<CreateReviewResponse> => {
  const { data } = await axiosInstance.post(`/stores/${storeId}/orders/${orderId}/reviews`, body);
  return data;
};
