// StoreHomeScreen.tsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlertOff from '@/assets/icons/alert-off.svg';
import Arrow from '@/assets/icons/arrow-down-line.svg';
import Cart from '@/assets/icons/cart.svg';
import Region from '@/assets/icons/region.svg';
import Search from '@/assets/icons/search.svg';
import { colors } from '@/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/** --------------------------------
 *  더미 데이터 (API 연결 전)
 * --------------------------------*/
const CATEGORIES = [
  { key: 'korean', label: '한식', img: 'https://via.placeholder.com/64' },
  { key: 'chinese', label: '중식', img: 'https://via.placeholder.com/64' },
  { key: 'japanese', label: '일식', img: 'https://via.placeholder.com/64' },
  { key: 'western', label: '양식', img: 'https://via.placeholder.com/64' },
  { key: 'street', label: '분식', img: 'https://via.placeholder.com/64' },
  { key: 'dessert', label: '디저트', img: 'https://via.placeholder.com/64' },
];

export const CATEGORY_IMAGES: Record<string, any> = {
  korean: require('@/assets/images/korean.webp'),
  chinese: require('@/assets/images/chinese.webp'),
  japanese: require('@/assets/images/japanese.webp'),
  western: require('@/assets/images/western.webp'),
  street: require('@/assets/images/street.webp'),
  dessert: require('@/assets/images/dessert.webp'),
};

type StoreItem = {
  id: string;
  name: string;
  distance: string;
  rating: number;
  price?: string;
  discount?: string;
  image: string;
};

const DISCOUNT_STORES: StoreItem[] = new Array(6).fill(null).map((_, i) => ({
  id: `d${i}`,
  name: i % 2 ? '판떡볶이' : '잠봉베르 샌드위치',
  distance: `${(Math.random() * 3 + 0.2).toFixed(1)}km`,
  rating: 4.5 + Math.random() * 0.4,
  price: '6,000원',
  discount: ['-40%', '-32%'][i % 2],
  image: 'https://via.placeholder.com/300x180',
}));

const POPULAR_STORES: StoreItem[] = new Array(6).fill(null).map((_, i) => ({
  id: `p${i}`,
  name: i % 2 ? '517낙지&아구' : '능동타코집',
  distance: `${(Math.random() * 3 + 0.2).toFixed(1)}km`,
  rating: 4.3 + Math.random() * 0.6,
  image: 'https://via.placeholder.com/300x180',
}));

/** --------------------------------
 *  상단 바
 * --------------------------------*/
function TopBar() {
  return (
    <View style={styles.topBar}>
      <View style={styles.regionBox}>
        <Region width={25} height={25} />
        <View style={styles.regionTextBox}>
          <Text style={styles.regionText} numberOfLines={1}>
            서울 종로구 창경궁로 254
          </Text>
          <Arrow />
        </View>
      </View>
      <View style={styles.topBarRight}>
        <TouchableOpacity style={styles.iconBtn}>
          <Cart width={27} height={26} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <AlertOff width={23} height={23} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SearchSection() {
  return (
    <View style={{ gap: 20, paddingHorizontal: 20 }}>
      <View>
        <Text style={styles.headline}>오늘의 한끼,</Text>
        <Text style={styles.headline}>어떤 음식으로 구출하시겠어요? 🍽️</Text>
      </View>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="메뉴·가게 검색하기"
          placeholderTextColor="#9C9C9C"
        />
        <Search />
      </View>
    </View>
  );
}

/** --------------------------------
 *  카테고리 가로 스크롤
 * --------------------------------*/
function CategoryCarousel() {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.key}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.categoryChip}>
          <Image source={CATEGORY_IMAGES[item.key]} style={styles.categoryImg} />
          <Text style={styles.categoryText}>{item.label}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

/** --------------------------------
 *  가로 카드: 한 장씩 스냅
 * --------------------------------*/
function HorizontalSnapList({
  title,
  data,
  showDiscountBadge,
}: {
  title: string;
  data: StoreItem[];
  showDiscountBadge?: boolean;
}) {
  // 카드 폭을 스냅 인터벌로 사용
  const CARD_WIDTH = useMemo(() => SCREEN_WIDTH * 0.78, []);
  const ITEM_SPACING = 12;
  const SNAP_INTERVAL = CARD_WIDTH + ITEM_SPACING;

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
        ItemSeparatorComponent={() => <View style={{ width: ITEM_SPACING }} />}
        renderItem={({ item }) => (
          <View style={[styles.storeCard, { width: CARD_WIDTH }]}>
            <Image source={{ uri: item.image }} style={styles.storeImage} />
            {showDiscountBadge && item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            )}
            <View style={{ paddingHorizontal: 12, paddingVertical: 10, gap: 6 }}>
              <Text style={styles.storeName} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{item.distance}</Text>
                <Text style={styles.dot}>·</Text>
                <Text style={styles.metaText}>⭐ {item.rating.toFixed(1)}</Text>
              </View>
              {!!item.price && <Text style={styles.priceText}>{item.price}</Text>}
            </View>
          </View>
        )}
      />
    </View>
  );
}

/** --------------------------------
 *  메인 스크린
 * --------------------------------*/
const StoreHomeScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.topSection}>
          <TopBar />

          <View style={{ paddingVertical: 15, gap: 18 }}>
            <SearchSection />
            <CategoryCarousel />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <HorizontalSnapList title="💸 할인율 최고" data={DISCOUNT_STORES} showDiscountBadge />
          <HorizontalSnapList title="🔥 인기 가게" data={POPULAR_STORES} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreHomeScreen;

/** --------------------------------
 *  styles
 * --------------------------------*/
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    gap: 10,
    backgroundColor: '#F6F6F6',
  },
  topSection: {
    backgroundColor: colors.WHITE,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomSection: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 18,
    gap: 20,
  },
  /** TopBar */
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
  iconBtn: {},

  /** Headline + Search */
  headline: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 18,
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },

  /** Categories */
  categoryChip: {
    width: 65,
    height: 98,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 9,
    borderWidth: 1.5,
    borderColor: '#E6E6E6',
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  categoryImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  categoryText: {
    fontSize: 12,
    color: '#686868',
    fontFamily: 'Pretendard-Medium',
  },

  /** Section */
  sectionContainer: {
    paddingHorizontal: 18,
    paddingLeft: 20,
  },
  sectionHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#111',
  },

  /** Store card */
  storeCard: {
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ECECEC',
  },
  storeImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#EEE',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EA575B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Pretendard-Bold',
  },
  storeName: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'Pretendard-SemiBold',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Pretendard-Regular',
  },
  dot: { color: '#9CA3AF' },
  priceText: {
    fontSize: 13,
    color: '#111',
    fontFamily: 'Pretendard-Bold',
  },
});
