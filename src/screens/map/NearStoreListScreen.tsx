import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import RestaurantList from '@/components/_common/RestaurantList';
import Sort from '@/components/_common/Sort';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import mapHooks from '@/hooks/queries/useMap';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { StoreSortOption } from '@/types/domain';

type Props = StackScreenProps<UserStackParamList, typeof userNavigations.STORE_LIST>;

const NearStoreListScreen = ({ route }: Props) => {
  const { latitude, longitude } = route.params;
  const [sortType, setSortType] = useState<StoreSortOption>('NEAR');

  const { stores, isLoadingMore, hasNextPage, fetchNextPage, refetch } = mapHooks.useInfiniteStores(
    {
      latitude,
      longitude,
      radiusKm: 5,
      sort: sortType,
      limit: 10,
      enabled: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [sortType, refetch]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isLoadingMore) fetchNextPage();
  }, [hasNextPage, isLoadingMore, fetchNextPage]);

  const handleSortChange = useCallback(
    (t: StoreSortOption) => {
      setSortType(t);

      setTimeout(() => {
        refetch();
      }, 0);
    },
    [refetch]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Sort onSortChange={handleSortChange} currentSort={sortType} />
      <FlatList
        data={stores}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <RestaurantList restaurant={item} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={colors.GREEN} />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            colors={[colors.GREEN]}
            tintColor={colors.GREEN}
            refreshing={false}
            onRefresh={refetch}
          />
        }
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
    alignItems: 'flex-start',
    backgroundColor: colors.WHITE,
    gap: 20,
  },
  footer: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
});

export default NearStoreListScreen;
