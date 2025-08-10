import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import Star from '@/assets/icons/star.svg';
import { itemSeparator } from '@/components/_common/ItemSeparator';
import { colors } from '@/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type StoreItem = {
  id: string;
  name: string;
  distance?: string;
  rating: number;
  price?: string;
  salePrice?: string;
  discount?: string;
  image: string; // uri
};

interface Props {
  title: string;
  data: StoreItem[];
  showDiscountBadge?: boolean;
  cardWidthRatio?: number;
  itemSpacing?: number;
}

const HorizontalSnapList = ({
  title,
  data,
  showDiscountBadge,
  cardWidthRatio = 0.6, // 기본값: 0.6
  itemSpacing = 12, // 기본값: 12
}: Props) => {
  const CARD_WIDTH = useMemo(() => SCREEN_WIDTH * cardWidthRatio, [cardWidthRatio]);
  const SNAP_INTERVAL = CARD_WIDTH + itemSpacing;
  const ItemSeparator = useMemo(() => itemSeparator(itemSpacing), [itemSpacing]);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        snapToAlignment="start"
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 18 }}
        renderItem={({ item }) => (
          <View style={[styles.storeCard, { width: CARD_WIDTH }]}>
            <Image source={{ uri: item.image }} style={styles.storeImage} />
            {showDiscountBadge && item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            )}
            <View style={{ paddingHorizontal: 12, paddingTop: 8, paddingBottom: 12, gap: 3 }}>
              <View style={styles.storeInfo}>
                <Text style={styles.storeName} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.ratingBox}>
                  <Star width={12} height={12} />
                  <Text style={styles.metaText}>{item.rating.toFixed(1)}</Text>
                </View>
              </View>

              {item.distance ? (
                <Text style={styles.distanceText}>{item.distance}</Text>
              ) : (
                <View style={styles.priceRow}>
                  {!!item.price && <Text style={styles.priceText}>{item.price}</Text>}
                  {!!item.salePrice && <Text style={styles.saleText}>{item.salePrice}</Text>}
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HorizontalSnapList;

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 10,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  storeCard: {
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  storeImage: {
    width: '100%',
    height: 105,
    backgroundColor: '#EEE',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    color: '#FF4B4B',
    fontFamily: 'Pretendard-Bold',
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeName: {
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
  metaText: {
    fontSize: 10,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 5,
  },
  priceText: {
    fontSize: 13,
    color: colors.BLACK,
    fontFamily: 'Pretendard-SemiBold',
  },
  saleText: {
    fontSize: 11,
    color: '#AFAFAF',
    fontFamily: 'Pretendard-Regular',
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  distanceText: {
    fontSize: 11,
    color: '#7E7E7E',
    fontFamily: 'Pretendard-Regular',
  },
});
