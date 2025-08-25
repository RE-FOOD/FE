import { useQuery } from '@tanstack/react-query';
import { getCarts } from '@/api/cart';
import { queryKeys } from '@/constants/keys';

function useGetCarts() {
  return useQuery({
    queryKey: [queryKeys.CART, queryKeys.GET_CART],
    queryFn: () => getCarts(),
  });
}

function useCart() {
  const cartListQuery = useGetCarts();

  return {
    cartListQuery,
  };
}

export default useCart;
