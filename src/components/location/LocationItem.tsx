import React, { memo } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Delete from '@/assets/icons/delete.svg';
import Location from '@/assets/icons/region-gray.svg';
import CurLocation from '@/assets/icons/region.svg';
import { colors } from '@/constants/colors';

type Props = {
  address: string;
  roadAddress: string;
  isMostRecent: boolean;
  onDelete: () => void;
  onPress: () => void;
  isLast: boolean;
};

const LocationItem = memo(
  ({ address, roadAddress, isMostRecent, onDelete, onPress, isLast }: Props) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isMostRecent}
        style={[s.itemRow, isLast && { borderBottomWidth: 0 }]}
      >
        <View style={s.left}>
          <View style={s.leadingIcon}>
            {isMostRecent ? (
              <CurLocation width={25} height={25} />
            ) : (
              <Location width={25} height={25} />
            )}
          </View>

          <View style={s.textCol}>
            <Text style={s.titleText} numberOfLines={1}>
              {roadAddress}
            </Text>
            <Text style={s.subtitle} numberOfLines={1}>
              {address}
            </Text>
          </View>
        </View>

        {isMostRecent ? (
          <View>
            <Text style={s.badge}>현위치</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={s.trailingBtn}
            onPress={onDelete}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Delete width={22} height={22} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
);

export default LocationItem;

const s = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: 'row',
    gap: 8,
  },
  leadingIcon: {
    marginTop: 2,
    alignItems: 'center',
  },
  textCol: {
    gap: 3,
  },
  titleText: {
    fontSize: 15,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
  },
  subtitle: {
    color: '#7b7b7bff',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  badge: {
    backgroundColor: '#FFF0F0',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    color: colors.RED,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  trailingBtn: {
    paddingLeft: 8,
  },
});
