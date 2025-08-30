import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { confirmPayment, createOrder, getOrder } from '@/api/order';
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

function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: { pickupDueAt: string; reuse: boolean }) => createOrder(payload),
  });
}

function useConfirmPayment() {
  return useMutation({
    mutationFn: confirmPayment,
    onError: () => {
      showToast('error', '결제 실패', '잠시 후 다시 시도해주세요.');
    },
  });
}

function useOrder() {
  const orderQuery = useOrderCheck();
  const createOrderMutation = useCreateOrder();
  const confirmPaymentMutation = useConfirmPayment();

  return {
    orderQuery,
    createOrderMutation,
    confirmPaymentMutation,
  };
}

export default useOrder;
