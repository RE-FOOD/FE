import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getReview,
  MyReviewsApiResponse,
  createReview,
  CreateReviewRequest,
  CreateReviewResponse,
} from '@/api/review';

interface UseCreateReviewParams {
  storeId: number;
  orderId: number;
}

export const useCreateReview = ({ storeId, orderId }: UseCreateReviewParams) => {
  const queryClient = useQueryClient();

  return useMutation<CreateReviewResponse, Error, CreateReviewRequest>({
    mutationFn: (reviewData) => createReview(storeId, orderId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['store', storeId] });
    },
  });
};

export const useMyReviewInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['review'],
    queryFn: ({ pageParam }) => getReview(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage: MyReviewsApiResponse) => {
      return lastPage.nextCursor || undefined;
    },
  });
};

export const useMyReviewFlat = () => {
  const query = useMyReviewInfiniteQuery();
  const reviews = query.data?.pages.flatMap((page) => page.stores) ?? [];

  return {
    ...query,
    reviews,
    totalCount: reviews.length,
  };
};
