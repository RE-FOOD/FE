import { useState, useMemo, useRef } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MyLikePage } from '@/api/like';
import RestaurantList, { RestaurantListData } from '@/components/_common/RestaurantList';
import Sort from '@/components/_common/Sort';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { useMyLikesInfinite } from '@/hooks/queries/useLike';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { StoreSortOption, Like } from '@/types/domain';

type Nav = StackNavigationProp<UserStackParamList>;

const transformLikeToRestaurant = (like: Like): RestaurantListData => ({
  id: like.id,
  name: like.name,
  imageUrl: like.imageUrl ?? '',
  distance: like.distance,
  rating: like.ratingAvg,
  reviewCount: like.count,
  status: like.status,
  maxPercent: like.salePercent,
});

const LikeHomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const [sortType, setSortType] = useState<StoreSortOption>('NEAR');
  const listRef = useRef<FlatList<RestaurantListData>>(null);

  const { data, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useMyLikesInfinite({ sort: sortType });

  const likes: Like[] = useMemo(
    () => (data ? data.pages.flatMap((p: MyLikePage) => p.stores) : []),
    [data]
  );

  const restaurants: RestaurantListData[] = useMemo(
    () => likes.map(transformLikeToRestaurant),
    [likes]
  );

  const handleSortChange = (type: StoreSortOption) => {
    setSortType(type);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Sort onSortChange={handleSortChange} currentSort={sortType} />
      <FlatList
        ref={listRef}
        data={restaurants}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={colors.GREEN} />
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <RestaurantList
            restaurant={item}
            onPress={(r) =>
              navigation.navigate(userNavigations.STORE_DETAIL, {
                storeId: r.id,
                storeName: r.name,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.WHITE,
    gap: 20,
  },
  footer: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  centered: { justifyContent: 'center', alignItems: 'center' },
});

export default LikeHomeScreen;
