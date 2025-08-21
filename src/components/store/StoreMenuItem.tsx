import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { formatPrice } from '@/utils/format';

type Props = {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  dailyDiscountPercent: number;
  dailyQuantity: number;
  imageUrl: string;
};

const StoreMenuItem = ({
  name,
  price,
  discountPrice,
  dailyDiscountPercent,
  dailyQuantity,
  imageUrl,
}: Props) => {
  const soldOut = dailyQuantity === 0;

  return (
    <View style={[styles.menuRow, soldOut && styles.soldOutRow]}>
      <View style={styles.menuTexts}>
        {soldOut && <Text style={styles.soldOutBadge}>품절된 메뉴입니다</Text>}

        <View style={{ gap: 4 }}>
          <Text style={[styles.menuName, soldOut && styles.grayText]} numberOfLines={1}>
            {name}
          </Text>

          <View style={styles.priceBlock}>
            <Text style={[styles.discountPercent, soldOut && styles.grayText]}>
              {dailyDiscountPercent}%
            </Text>

            <Text style={[styles.discountPrice, soldOut && styles.grayText]}>
              {formatPrice(discountPrice)}
            </Text>

            <Text style={[styles.originalPrice, soldOut && styles.grayText]}>
              {formatPrice(price)}
            </Text>
          </View>
        </View>
      </View>

      <Image source={{ uri: imageUrl }} style={styles.menuImage} />
    </View>
  );
};

export default StoreMenuItem;

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuTexts: {
    flex: 1,
    paddingRight: 12,
  },
  soldOutBadge: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#e21414',
    marginBottom: 4,
  },
  menuName: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 17,
    color: colors.BLACK,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  discountPercent: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: '#FF4B4B',
  },
  discountPrice: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: colors.BLACK,
  },
  originalPrice: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 11,
    color: '#919191',
    textDecorationLine: 'line-through',
  },
  menuImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  soldOutRow: {
    opacity: 0.6,
  },
  grayText: {
    color: '#a6a6a6',
  },
});
