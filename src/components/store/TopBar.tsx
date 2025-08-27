import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AlertOff from '@/assets/icons/alert-off.svg';
import Arrow from '@/assets/icons/arrow-down-line.svg';
import Cart from '@/assets/icons/cart.svg';
import Region from '@/assets/icons/region.svg';
import { colors } from '@/constants/colors';

interface TopBarProps {
  locationLabel: string;
  onPressLocation?: () => void;
  onPressNotification?: () => void;
  onPressCart?: () => void;
  cartCount?: number;
}

const TopBar = ({
  locationLabel,
  onPressLocation,
  onPressNotification,
  onPressCart,
  cartCount = 0,
}: TopBarProps) => {
  return (
    <View style={styles.topBar}>
      <View style={styles.regionBox}>
        <Region width={25} height={25} />
        <TouchableOpacity onPress={onPressLocation}>
          <View style={styles.regionTextBox}>
            <Text style={styles.regionText} numberOfLines={1}>
              {locationLabel}
            </Text>
            <Arrow />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.topBarRight}>
        <TouchableOpacity onPress={onPressCart}>
          <View style={styles.cartWrapper}>
            <Cart width={27} height={26} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNotification}>
          <AlertOff width={23} height={23} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    paddingHorizontal: 20,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  regionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 7,
    flex: 1,
  },
  regionTextBox: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  regionText: {
    fontSize: 13,
    color: colors.BLACK,
    fontFamily: 'Pretendard-SemiBold',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 11,
  },
  cartWrapper: {
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
  },
  badgeText: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#fff',
    fontSize: 9.5,
  },
});

export default TopBar;
