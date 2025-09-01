import axiosInstance from './axios';
import { Review } from '@/types/domain';

export type MyReviewResponse = Pick<Review, 'id' | 'rating' | 'content' | 'createdAt'> & {
  storeId: number;
  orderId: number;
  memberId: number;
  menuList: { id: number; name: string }[];
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

export const deleteReview = async (
  storeId: number,
  orderId: number,
  reviewId: number
): Promise<void> => {
  console.log('🛠️ deleteReview 호출됨:', { storeId, orderId, reviewId });
  await axiosInstance.delete(`/stores/${storeId}/orders/${orderId}/reviews/${reviewId}`);
};
