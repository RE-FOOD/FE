import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import queryClient from '@/api/queryClient';
import CategoryCarousel from '@/components/store/CategoryCarousel';
import HorizontalSnapList, { StoreItem } from '@/components/store/HorizontalSnapList';
import SearchSection from '@/components/store/SearchSection';
import TopBar from '@/components/store/TopBar';
import { CategoryKey } from '@/constants/categoryImages';
import { colors } from '@/constants/colors';
import { queryKeys } from '@/constants/keys';
import { userNavigations } from '@/constants/navigations';
import { useGetOverviews } from '@/hooks/queries/useMember';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { DiscountMenu, PopularStore } from '@/types/domain';

type NavigationProp = StackNavigationProp<UserStackParamList>;

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'korean', label: '한식' },
  { key: 'chinese', label: '중식' },
  { key: 'japanese', label: '일식' },
  { key: 'western', label: '양식' },
  { key: 'street', label: '분식' },
  { key: 'dessert', label: '디저트' },
];

const StoreHomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  // const { data, refetch, isLoading, isError } = useGetOverviews();
  const { data, refetch } = useGetOverviews();

  useEffect(() => {
    if (data?.data?.discountMenu) {
      const uris = data.data.discountMenu.map((m) => ({ uri: m.imageUrl }));
      FastImage.preload(uris);
    }
    if (data?.data?.popularStores) {
      const uris = data.data.popularStores.map((s) => ({ uri: s.imageUrl }));
      FastImage.preload(uris);
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const goDetail = (item: StoreItem) => {
    queryClient.removeQueries({
      queryKey: [queryKeys.STORE, queryKeys.GET_STORE_DETAIL],
      exact: false,
    });
    navigation.navigate(userNavigations.STORE_DETAIL, { storeId: item.id, storeName: item.name });
  };

  const discountMenuItems: StoreItem[] =
    data?.data?.discountMenu?.map((item: DiscountMenu) => ({
      id: item.storeId,
      name: item.menuName,
      rating: item.ratingAvg,
      price: `${item.price.toLocaleString()}원`,
      salePrice: `${item.discountPrice.toLocaleString()}원`,
      discount: `-${item.discountPercent}%`,
      image: item.imageUrl,
    })) ?? [];

  const popularStoreItems: StoreItem[] =
    data?.data?.popularStores?.map((item: PopularStore) => ({
      id: item.id,
      name: item.name,
      rating: item.ratingAvg,
      distance: `${item.distance}km`,
      image: item.imageUrl,
    })) ?? [];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <TopBar
            locationLabel={data?.locationLabel ?? ''}
            cartCount={data?.data.cartCount ?? 0}
            hasUnread={data?.data.hasUnread ?? false}
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
          <HorizontalSnapList
            title="할인율 최고 💸"
            onPressItem={goDetail}
            data={discountMenuItems}
            showDiscountBadge
          />
          <HorizontalSnapList
            title="인기 가게 🔥"
            onPressItem={goDetail}
            data={popularStoreItems}
          />
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
