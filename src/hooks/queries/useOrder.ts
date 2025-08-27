import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getOrder } from '@/api/order';
import { queryKeys } from '@/constants/keys';
import { showToast } from '@/utils/toast';

function useOrderCheck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getOrder,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        showToast('error', '재고 수량 부족', '선택하신 메뉴 중 재고가 부족한 제품이 존재합니다.');
        queryClient.invalidateQueries({ queryKey: [queryKeys.CART, queryKeys.GET_CART] });
      }
    },
  });
}
function useOrder() {
  const orderQuery = useOrderCheck();

  return {
    orderQuery,
  };
}

export default useOrder;
