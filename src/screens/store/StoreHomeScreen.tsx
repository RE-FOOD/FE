import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CategoryCarousel from '@/components/store/CategoryCarousel';
import HorizontalSnapList, { StoreItem } from '@/components/store/HorizontalSnapList';
import SearchSection from '@/components/store/SearchSection';
import TopBar from '@/components/store/TopBar';
import { CategoryKey } from '@/constants/categoryImages';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type NavigationProp = StackNavigationProp<UserStackParamList>;

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'korean', label: '한식' },
  { key: 'chinese', label: '중식' },
  { key: 'japanese', label: '일식' },
  { key: 'western', label: '양식' },
  { key: 'street', label: '분식' },
  { key: 'dessert', label: '디저트' },
];

const DISCOUNT_STORES: StoreItem[] = new Array(6).fill(null).map((_, i) => ({
  id: `d${i}`,
  name: i % 2 ? '판떡볶이' : '잠봉베르 샌드위치',
  rating: 4.5 + Math.random() * 0.4,
  price: i % 2 ? '10,000원' : '4,000원',
  salePrice: i % 2 ? '6,000원' : '2,700원',
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

const StoreHomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <TopBar
            locationLabel="서울 종로구 창경궁로 254"
            onPressLocation={() => navigation.navigate(userNavigations.LOCATION)}
            onPressCart={() => navigation.navigate(userNavigations.CART)}
            onPressNotification={() => navigation.navigate(userNavigations.NOTIFICATION)}
          />
          <View style={{ paddingVertical: 15, gap: 18 }}>
            <View style={styles.searchSection}>
              <View>
                <Text style={styles.headline}>오늘의 한끼,</Text>
                <Text style={styles.headline}>어떤 음식으로 구출하시겠어요? 🍽️</Text>
              </View>
            </View>
            <CategoryCarousel
              categories={CATEGORIES}
              onSelect={(c) =>
                navigation.navigate(userNavigations.CATEGORY_LIST, { key: c.key, label: c.label })
              }
            />
            <View style={styles.searchSection}>
              <SearchSection
                onSubmitKeyword={(q) =>
                  navigation.navigate(userNavigations.SEARCH_RESULT, { keyword: q })
                }
              />
            </View>
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
  searchSection: {
    paddingHorizontal: 20,
    gap: 20,
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  bottomSection: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 18,
    gap: 20,
  },
});
