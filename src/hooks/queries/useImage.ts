// hooks/queries/useImage.ts
import { useMutation } from '@tanstack/react-query';
import { postImage, PostImageResponse } from '@/api/image';
import { ResponseError, UseMutationCustomOptions, ApiResponse } from '@/types/api';

export const usePostImage = (
  options?: UseMutationCustomOptions<ApiResponse<PostImageResponse>, string>
) => {
  return useMutation<ApiResponse<PostImageResponse>, ResponseError, string>({
    mutationFn: postImage,
    ...options,
  });
};
