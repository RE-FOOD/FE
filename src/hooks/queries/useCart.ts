import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCarts,
  checkCartStore,
  addMenuToCart,
  updateCartItem,
  AddMenuRequest,
  UpdateCartRequest,
  getCartCount,
} from '@/api/cart';
import { queryKeys } from '@/constants/keys';
import { showToast } from '@/utils/toast';

function useGetCarts() {
  return useQuery({
    queryKey: [queryKeys.CART, queryKeys.GET_CART],
    queryFn: getCarts,
  });
}

function useGetCartCount() {
  return useQuery({
    queryKey: [queryKeys.CART, queryKeys.GET_CART_COUNT],
    queryFn: getCartCount,
  });
}

function useCheckCartStore() {
  return useMutation({
    mutationFn: (storeId: number) => checkCartStore(storeId),
  });
}

function useAddMenuToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddMenuRequest) => addMenuToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART, queryKeys.GET_CART] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART, queryKeys.GET_CART_COUNT] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_OVERVIEWS] });
      showToast('success', '선택하신 메뉴가 장바구니에 추가되었습니다.');
    },
    onError: () => {
      showToast('error', '장바구니 담기에 실패했습니다');
    },
  });
}

function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCartRequest) => updateCartItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART, queryKeys.GET_CART] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART, queryKeys.GET_CART_COUNT] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_OVERVIEWS] });
    },
  });
}

function useCart() {
  const cartListQuery = useGetCarts();
  const checkCartStoreMutation = useCheckCartStore();
  const addMenuMutation = useAddMenuToCart();
  const updateCartMutation = useUpdateCartItem();
  const cartCountQuery = useGetCartCount();

  return {
    cartListQuery,
    checkCartStoreMutation,
    addMenuMutation,
    updateCartMutation,
    cartCountQuery,
  };
}

export default useCart;
