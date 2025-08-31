import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Cart from '@/assets/icons/cart.svg';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import useCart from '@/hooks/queries/useCart';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Nav = StackNavigationProp<UserStackParamList>;

const CartButton = () => {
  const navigation = useNavigation<Nav>();

  const { cartCountQuery } = useCart();
  const count = cartCountQuery.data ?? 0;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(userNavigations.CART)}
      style={{ paddingHorizontal: 10, marginRight: 20 }}
    >
      <View style={styles.wrapper}>
        <Cart width={27} height={26} />
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#EA575B',
    borderRadius: 50,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontFamily: 'Pretendard-SemiBold',
    color: colors.WHITE,
    fontSize: 9.5,
  },
});

export default CartButton;
