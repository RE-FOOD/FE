import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import queryClient from '@/api/queryClient';
import Arrow from '@/assets/icons/arrow-right.svg';
import Bin from '@/assets/icons/bin.svg';
import { colors } from '@/constants/colors';
import { queryKeys } from '@/constants/keys';
import { userNavigations } from '@/constants/navigations';
import useCart from '@/hooks/queries/useCart';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Nav = StackNavigationProp<UserStackParamList>;

const CartScreen = () => {
  const navigation = useNavigation<Nav>();
  const { cartListQuery } = useCart();
  const { data: store, isLoading, isError } = cartListQuery;

  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !store) return <Text>장바구니를 불러올 수 없습니다</Text>;

  const _goDetail = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cartContainer}>
        <View style={styles.storeRow}>
          <Image source={{ uri: store.imageUrl }} style={styles.storeImage} />
          <View style={styles.storeInfoRow}>
            <Text style={styles.storeName}>{store.name}</Text>
            <TouchableOpacity>
              <Arrow width={14} height={20} />
            </TouchableOpacity>
          </View>
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
                <View>
                  <Bin />
                  <Text style={{ color: colors.BLACK }}>수량 조절</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>{store.totalCoast.toLocaleString()}원</Text>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: colors.GRAY_200,
  },
  total: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: colors.GREEN,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: colors.GRAY_200,
  },
  orderText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});

export default CartScreen;
