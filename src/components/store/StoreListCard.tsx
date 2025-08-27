import React from 'react';
import { View, Text, Image, StyleSheet, DimensionValue } from 'react-native';
import Star from '@/assets/icons/star.svg';
import { colors } from '@/constants/colors';
import { Store } from '@/types/domain';

interface Props {
  item: Store;
  width?: DimensionValue;
  showDiscountBadge?: boolean;
}

const StoreListCard = ({ item, width = '100%', showDiscountBadge }: Props) => {
  return (
    <View style={[styles.card, { width }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      {showDiscountBadge && item.discountPercent && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.discountPercent}</Text>
        </View>
      )}
      <View style={{ paddingHorizontal: 12, paddingTop: 8, paddingBottom: 12, gap: 3 }}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.ratingBox}>
            <Star width={12} height={12} />
            {item.count ? (
              <View style={styles.ratingRow}>
                <Text style={styles.meta}>{item.ratingAvg ?? 0}</Text>
                <Text style={styles.metaCnt}>{`(${item.count})`}</Text>
              </View>
            ) : (
              <Text style={styles.meta}>{item.ratingAvg ?? 0}</Text>
            )}
          </View>
        </View>
        <Text style={styles.distance}>{item.distance}km</Text>
      </View>
    </View>
  );
};

export default StoreListCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 145,
    backgroundColor: '#EEE',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#FF4B4B',
    fontFamily: 'Pretendard-Bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    color: colors.BLACK,
    fontFamily: 'Pretendard-SemiBold',
  },
  ratingBox: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 5,
    gap: 3,
    backgroundColor: '#FFF8EF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    fontSize: 10,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 12,
  },
  metaCnt: {
    fontSize: 10,
    color: '#9C9C9C',
    fontFamily: 'Pretendard-Medium',
    lineHeight: 11.5,
  },
  price: {
    fontSize: 13,
    color: colors.BLACK,
    fontFamily: 'Pretendard-SemiBold',
  },
  sale: {
    fontSize: 11,
    color: '#AFAFAF',
    fontFamily: 'Pretendard-Regular',
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  distance: {
    fontSize: 11,
    color: '#7E7E7E',
    fontFamily: 'Pretendard-Regular',
  },
});
