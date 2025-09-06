import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import queryClient from '@/api/queryClient';
import Arrow from '@/assets/icons/arrow-right.svg';
import EmptyState from '@/components/_common/EmptyState';
import CustomModal from '@/components/_modal/CustomModal';
import CartFooter from '@/components/cart/CartFooter';
import CartMenuItem from '@/components/cart/CartMenuItem';
import { colors } from '@/constants/colors';
import { queryKeys } from '@/constants/keys';
import { userNavigations } from '@/constants/navigations';
import useCart from '@/hooks/queries/useCart';
import useOrder from '@/hooks/queries/useOrder';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { CartMenu } from '@/types/domain';
import { showToast } from '@/utils/toast';

type Nav = StackNavigationProp<UserStackParamList>;

const CartScreen = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);

  const navigation = useNavigation<Nav>();
  const { cartListQuery, updateCartMutation } = useCart();
  const { data: store, isLoading, isError } = cartListQuery;
  const { orderQuery } = useOrder();

  useEffect(() => {
    if (store?.imageUrl) {
      FastImage.preload([{ uri: store.imageUrl }]);
    }
    if (store?.menus?.length) {
      const uris = store.menus.map((m) => ({ uri: m.imageUrl }));
      FastImage.preload(uris);
    }
  }, [store]);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !store) return <Text>장바구니를 불러올 수 없습니다</Text>;

  const goDetail = () => {
    queryClient.removeQueries({
      queryKey: [queryKeys.STORE, queryKeys.GET_STORE_DETAIL],
      exact: false,
    });
    navigation.navigate(userNavigations.STORE_DETAIL, { storeId: store.id, storeName: store.name });
  };

  const calculateOriginalTotal = (menus: CartMenu[]): number =>
    menus.reduce((sum, menu) => sum + menu.price * menu.orderQuantity, 0);

  if (store.menus.length === 0) {
    return (
      <EmptyState
        icon={require('@/assets/images/empty-cart.webp')}
        title="장바구니가 비어있어요"
        subtitle="원하는 메뉴를 담아 음식을 구출해보세요!"
      />
    );
  }

  const updateMenus = (menuId: number, quantity: number) => {
    const targetMenu = store.menus.find((m) => m.id === menuId);
    if (!targetMenu) return;
    if (quantity > targetMenu.orderQuantity && quantity > targetMenu.dailyQuantity) {
      showToast('error', `최대 주문 가능 개수를 초과했습니다.`);
      return;
    }

    const updatedMenus = store.menus.map((menu) => ({
      id: menu.id,
      quantity: menu.id === menuId ? quantity : menu.orderQuantity,
    }));

    updateCartMutation.mutate({ id: store.id, menus: updatedMenus });
  };

  const handleModalClick = (btnIndex: number) => {
    if (btnIndex === 1 && selectedMenuId !== null) updateMenus(selectedMenuId, 0);
    setSelectedMenuId(null);
  };

  const handleOrderClick = async () => {
    try {
      const res = await orderQuery.mutateAsync();
      navigation.navigate(userNavigations.ORDER, { order: res });
    } catch (error) {
      console.error(error);
    }
  };

  const originalTotal = calculateOriginalTotal(store.menus);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.cartContainer}>
        <View style={styles.storeRow}>
          <FastImage
            source={{ uri: store.imageUrl, priority: FastImage.priority.normal }}
            style={styles.storeImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TouchableOpacity onPress={goDetail} style={styles.storeInfoRow}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Arrow width={14} height={20} />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 26 }}>
          {store.menus.map((menu) => (
            <CartMenuItem
              key={menu.id}
              menu={menu}
              onDecrease={() => updateMenus(menu.id, Math.max(1, menu.orderQuantity - 1))}
              onIncrease={() => updateMenus(menu.id, menu.orderQuantity + 1)}
              onRemove={() => {
                setSelectedMenuId(menu.id);
                setModalOpen(true);
              }}
            />
          ))}
        </View>
      </ScrollView>

      <CustomModal
        state="DeleteMenu"
        type="warning"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onButtonClick={handleModalClick}
      />

      <CartFooter
        originalTotal={originalTotal}
        total={store.totalCoast}
        onClick={handleOrderClick}
        disabled={store.menus.every((m) => m.dailyQuantity === 0)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
  },
  cartContainer: {
    padding: 30,
    gap: 27,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  storeImage: {
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  storeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  storeName: {
    color: colors.BLACK,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default CartScreen;
