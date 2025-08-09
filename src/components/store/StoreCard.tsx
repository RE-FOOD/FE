import React from 'react';
import { View, Text, Image, StyleSheet, DimensionValue } from 'react-native';
import Star from '@/assets/icons/star.svg';
import { colors } from '@/constants/colors';

export type StoreItem = {
  id: string;
  name: string;
  distance?: string;
  rating: number;
  ratingCnt?: string;
  price?: string;
  salePrice?: string;
  discount?: string;
  image: string; // uri
};

interface Props {
  item: StoreItem;
  width?: DimensionValue;
  showDiscountBadge?: boolean;
}

const StoreCard = ({ item, width = '100%', showDiscountBadge }: Props) => {
  return (
    <View style={[styles.card, { width }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {showDiscountBadge && item.discount && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.discount}</Text>
        </View>
      )}
      <View style={{ paddingHorizontal: 12, paddingTop: 8, paddingBottom: 12, gap: 3 }}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.ratingBox}>
            <Star width={12} height={12} />
            {item.ratingCnt ? (
              <View style={styles.ratingRow}>
                <Text style={styles.meta}>{item.rating.toFixed(1)}</Text>
                <Text style={styles.metaCnt}>{`(${item.ratingCnt})`}</Text>
              </View>
            ) : (
              <Text style={styles.meta}>{item.rating.toFixed(1)}</Text>
            )}
          </View>
        </View>
        {item.distance ? (
          <Text style={styles.distance}>{item.distance}</Text>
        ) : (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {!!item.price && <Text style={styles.price}>{item.price}</Text>}
            {!!item.salePrice && <Text style={styles.sale}>{item.salePrice}</Text>}
          </View>
        )}
      </View>
    </View>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  image: {
    width: '100%',
    height: 105,
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
