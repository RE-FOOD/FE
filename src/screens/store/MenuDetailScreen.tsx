import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingScreen from '../_common/LoadingScreen';
import Minus from '@/assets/icons/minus.svg';
import Plus from '@/assets/icons/plus.svg';
import CustomModal from '@/components/_modal/CustomModal';
import { colors } from '@/constants/colors';
import useCart from '@/hooks/queries/useCart';
import { useGetCartCount } from '@/hooks/queries/useMember';
import useStore from '@/hooks/queries/useStore';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { renderHeaderCartButton } from '@/utils/navigation';
import { showToast } from '@/utils/toast';

type Rt = RouteProp<UserStackParamList, 'MenuDetail'>;
type Nav = StackNavigationProp<UserStackParamList, 'MenuDetail'>;

const MenuDetailScreen = () => {
  const { params } = useRoute<Rt>();
  const navigation = useNavigation<Nav>();
  const { storeId, storeName, menuId } = params;
  const { data: cartCount } = useGetCartCount();

  const { menuDetailQuery } = useStore(storeId, menuId);
  const { checkCartStoreMutation, addMenuMutation } = useCart();
  const { data: menu, isLoading } = menuDetailQuery;

  const [count, setCount] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: storeName, headerRight: renderHeaderCartButton });
  }, [navigation, storeName]);

  useEffect(() => {
    if (menu?.imageUrl) {
      FastImage.preload([{ uri: menu.imageUrl }]);
    }
  }, [menu?.imageUrl]);

  if (isLoading || !menu) {
    return <LoadingScreen />;
  }

  const discountedPrice = Math.floor(menu.price * (1 - menu.dailyDiscountPercent / 100));
  const totalPrice = discountedPrice * count;

  const addToCart = async () => {
    if (cartCount === 0) {
      addMenuMutation.mutate({
        checkNew: true,
        storeId,
        menuId,
        quantity: count,
      });
      return;
    }

    const result = await checkCartStoreMutation.mutateAsync(storeId);

    if (result.httpStatus === 200) {
      addMenuMutation.mutate({
        checkNew: false,
        storeId,
        menuId,
        quantity: count,
      });
    } else if (result.httpStatus === 201) {
      addMenuMutation.mutate({
        checkNew: true,
        storeId,
        menuId,
        quantity: count,
      });
    } else if (result.httpStatus === 409) {
      setModalOpen(true);
    }
  };

  const handleModalClick = (btnIndex: number) => {
    // 0 = 취소
    if (btnIndex === 0) return;
    // 5 = 새로 담기
    if (btnIndex === 1) {
      addMenuMutation.mutate({
        checkNew: true,
        storeId,
        menuId,
        quantity: count,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FastImage
          source={{
            uri: menu.imageUrl,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.descBox}>
          <Text style={styles.title}>{menu.name}</Text>
          <Text style={styles.description}>{menu.info}</Text>
        </View>

        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <Text style={styles.subTitle}>가격</Text>
            <View style={styles.priceRow}>
              {menu.dailyDiscountPercent > 0 && (
                <Text style={styles.discount}>-{menu.dailyDiscountPercent}%</Text>
              )}
              <View style={styles.priceInnerRow}>
                <Text style={styles.price}>{discountedPrice.toLocaleString()}원</Text>
                {menu.dailyDiscountPercent > 0 && (
                  <Text style={styles.originalPrice}>{menu.price.toLocaleString()}원</Text>
                )}
              </View>
            </View>
          </View>

          <View style={{ gap: 15 }}>
            <View style={styles.optionRow}>
              <Text style={styles.subTitle}>수량</Text>
              <View style={styles.row}>
                <Pressable
                  onPress={() => setCount((c) => Math.max(1, c - 1))}
                  style={[styles.counterBtn, count === 1 && { opacity: 0.2 }]}
                  disabled={count === 1}
                >
                  <Minus width={20} height={20} />
                </Pressable>
                <View style={styles.countRow}>
                  <Text style={styles.count}>{count}</Text>
                </View>
                <Pressable
                  onPress={() => {
                    if (count >= menu.dailyQuantity) {
                      showToast(
                        'error',
                        `현재 주문 가능한 최대 수량은 ${menu.dailyQuantity}개입니다.`
                      );
                      return;
                    }
                    setCount((c) => c + 1);
                  }}
                  style={styles.counterBtn}
                >
                  <Plus width={20} height={20} />
                </Pressable>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.stock}>재고수량: {menu.dailyQuantity}개</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <View>
          {menu.dailyDiscountPercent > 0 && (
            <Text style={styles.totalOriginal}>{(menu.price * count).toLocaleString()}원</Text>
          )}
          <Text style={styles.total}>{totalPrice.toLocaleString()}원</Text>
        </View>
        <Pressable style={styles.cartBtn} onPress={addToCart}>
          <Text style={styles.cartBtnText}>장바구니에 담기</Text>
        </Pressable>
      </View>
      <CustomModal
        state="ResetCart"
        type="warning"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onButtonClick={handleModalClick}
      />
    </SafeAreaView>
  );
};

export default MenuDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  image: {
    width: '100%',
    height: 220,
  },
  infoContainer: {
    gap: 30,
    padding: 25,
  },
  descBox: {
    gap: 5,
  },
  optionContainer: {
    gap: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  priceInnerRow: {
    flexDirection: 'row',
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
    lineHeight: 19,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#919191',
  },
  discount: {
    color: '#FF4B4B',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  originalPrice: {
    fontSize: 13,
    color: '#919191',
    fontFamily: 'Pretendard-Medium',
    textDecorationLine: 'line-through',
  },
  counterBtn: {
    width: 35,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
  },
  countRow: {
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#919191',
    borderRightWidth: 1,
    borderRightColor: '#919191',
  },
  count: {
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
    fontSize: 16,
    minWidth: 36,
    textAlign: 'center',
  },
  stock: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#575757',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
    alignItems: 'center',
  },
  totalOriginal: {
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
  cartBtn: {
    backgroundColor: '#0FB758',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  cartBtnText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
});
