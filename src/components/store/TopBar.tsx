import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AlertOff from '@/assets/icons/alert-off.svg';
import Arrow from '@/assets/icons/arrow-down-line.svg';
import Cart from '@/assets/icons/cart.svg';
import Region from '@/assets/icons/region.svg';
import { colors } from '@/constants/colors';

interface TopBarProps {
  locationLabel: string; // 현재 지역명
  onPressLocation?: () => void;
  onPressNotification?: () => void;
  onPressCart?: () => void;
}

const TopBar = ({
  locationLabel,
  onPressLocation,
  onPressNotification,
  onPressCart,
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
          <Cart width={27} height={26} />
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
});

export default TopBar;
