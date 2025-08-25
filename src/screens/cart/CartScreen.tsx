import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import queryClient from '@/api/queryClient';
import Arrow from '@/assets/icons/arrow-right.svg';
import Bin from '@/assets/icons/bin.svg';
import Minus from '@/assets/icons/minus.svg';
import Plus from '@/assets/icons/plus.svg';
import CustomModal from '@/components/_modal/CustomModal';
import { colors } from '@/constants/colors';
import { queryKeys } from '@/constants/keys';
import { userNavigations } from '@/constants/navigations';
import useCart from '@/hooks/queries/useCart';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { showToast } from '@/utils/toast';

type Nav = StackNavigationProp<UserStackParamList>;

const CartScreen = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);

  const navigation = useNavigation<Nav>();
  const { cartListQuery, updateCartMutation } = useCart();
  const { data: store, isLoading, isError } = cartListQuery;

  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !store) return <Text>장바구니를 불러올 수 없습니다</Text>;

  const goDetail = () => {
    queryClient.removeQueries({
      queryKey: [queryKeys.STORE, queryKeys.GET_STORE_DETAIL],
      exact: false,
    });
    navigation.navigate(userNavigations.STORE_DETAIL, { storeId: store.id, storeName: store.name });
  };

  if (store.menus.length === 0) {
    return (
      <View>
        <Text style={{ color: colors.BLACK }}>장바구니에 담긴 메뉴가 없습니다.</Text>
      </View>
    );
  }

  const updateQuantity = (menuId: number, newQty: number, dailyQuantity: number) => {
    if (newQty > dailyQuantity) {
      showToast('error', `최대 주문 가능 개수는 ${dailyQuantity}입니다.`);
      return;
    }
    updateCartMutation.mutate({
      id: store.id,
      menus: [{ id: menuId, quantity: newQty }],
    });
  };

  const removeItem = (menuId: number) => {
    updateCartMutation.mutate({
      id: store.id,
      menus: [{ id: menuId, quantity: 0 }],
    });
  };

  const handleModalClick = (btnIndex: number) => {
    if (btnIndex === 1 && selectedMenuId !== null) {
      removeItem(selectedMenuId);
    }
    setSelectedMenuId(null);
  };

  const originalTotal = store.menus.reduce((sum, menu) => sum + menu.price * menu.orderQuantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.cartContainer}>
        <View style={styles.storeRow}>
          <Image source={{ uri: store.imageUrl }} style={styles.storeImage} />
          <TouchableOpacity onPress={goDetail} style={styles.storeInfoRow}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Arrow width={14} height={20} />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 26 }}>
          {store.menus.map((menu) => {
            const soldOut = menu.dailyQuantity === 0;

            return (
              <View key={menu.id} style={styles.cardItem}>
                <View style={[styles.menuCard, soldOut && styles.soldOutCard]}>
                  {soldOut && <Text style={styles.soldOutLabel}>품절된 메뉴입니다</Text>}
                  <View style={styles.menuContainer}>
                    <Image source={{ uri: menu.imageUrl }} style={styles.image} />
                    <View style={styles.menuInfo}>
                      <Text style={[styles.menuName, soldOut && styles.soldOutText]}>
                        {menu.name}
                      </Text>
                      <View style={styles.priceRow}>
                        <Text style={[styles.percent, soldOut && styles.soldOutText]}>
                          -{menu.dailyDiscountPercent}%
                        </Text>
                        <Text style={[styles.price, soldOut && styles.soldOutText]}>
                          {menu.discountPrice.toLocaleString()}원
                        </Text>
                        <Text style={[styles.originalPrice, soldOut && styles.soldOutText]}>
                          {menu.price.toLocaleString()}원
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedMenuId(menu.id);
                      setModalOpen(true);
                    }}
                    style={styles.binBtn}
                  >
                    <Bin width={20} height={20} />
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Pressable
                      onPress={() =>
                        updateQuantity(
                          menu.id,
                          Math.max(1, menu.orderQuantity - 1),
                          menu.dailyQuantity
                        )
                      }
                      disabled={menu.orderQuantity === 1}
                      style={[styles.counterBtn, menu.orderQuantity === 1 && { opacity: 0.3 }]}
                    >
                      <Minus width={18} height={18} />
                    </Pressable>

                    <View style={styles.countBox}>
                      <Text style={styles.countText}>{menu.orderQuantity}</Text>
                    </View>

                    <Pressable
                      onPress={() =>
                        updateQuantity(menu.id, menu.orderQuantity + 1, menu.dailyQuantity)
                      }
                      style={styles.counterBtn}
                    >
                      <Plus width={18} height={18} />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <CustomModal
        state="DeleteMenu"
        type="warning"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onButtonClick={handleModalClick}
      />

      <View style={styles.footer}>
        <View>
          <Text style={styles.originalTotal}>{originalTotal.toLocaleString()}원</Text>
          <Text style={styles.total}>{store.totalCoast.toLocaleString()}원</Text>
        </View>
        <TouchableOpacity
          disabled={store.menus.every((m) => m.dailyQuantity === 0)}
          style={[
            styles.orderButton,
            store.menus.every((m) => m.dailyQuantity === 0) && styles.disabledButton,
          ]}
        >
          <Text style={styles.orderText}>픽업 주문하기</Text>
        </TouchableOpacity>
      </View>
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
  storeImageWrapper: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: colors.RED,
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
  cardItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: 15,
    gap: 20,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soldOutCard: {
    opacity: 0.5,
  },
  menuContainer: {
    flexDirection: 'row',
    gap: 13,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  menuInfo: {
    gap: 7,
  },
  soldOutLabel: {
    color: colors.RED,
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    marginBottom: 10,
  },
  menuName: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 5,
  },
  percent: {
    color: '#FF4B4B',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: colors.BLACK,
    fontFamily: 'Pretendard-SemiBold',
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    fontFamily: 'Pretendard-Medium',
    color: '#919191',
  },
  soldOutText: {
    color: colors.BLACK,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'flex-end',
  },
  counterBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 5,
  },
  countBox: {
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  binBtn: {
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  originalTotal: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#919191',
    textDecorationLine: 'line-through',
  },
  total: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  orderButton: {
    backgroundColor: '#0FB758',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.GRAY_200,
  },
  orderText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default CartScreen;
