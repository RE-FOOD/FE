import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  RefreshControl,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingScreen from '../_common/LoadingScreen';
import queryClient from '@/api/queryClient';
import LoadingFooter from '@/components/store/LoadingFooter';
import StickyControls, { type SortKey } from '@/components/store/StickyControls';
import StoreListCard from '@/components/store/StoreListCard';
import { colors } from '@/constants/colors';
import { queryKeys } from '@/constants/keys';
import { userNavigations } from '@/constants/navigations';
import useStore, { BaseFilters } from '@/hooks/queries/useStore';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { Store, StoreSort } from '@/types/domain';
import { renderHeaderCartButton } from '@/utils/navigation';
import { useListScrollStore } from '@/zustand/useListScrollStore';

type Nav = StackNavigationProp<UserStackParamList, typeof userNavigations.SEARCH_RESULT>;
type Rt = RouteProp<UserStackParamList, typeof userNavigations.SEARCH_RESULT>;

type StickyRow = { __type: 'sticky' };
type Row = StickyRow | Store;

const sortMap: Record<SortKey, StoreSort> = {
  distance: 'NEAR',
  review: 'REVIEW',
  rating: 'RATING',
};

const SearchResultScreen = () => {
  const { useInfiniteStoreList } = useStore();
  const route = useRoute<Rt>();
  const navigation = useNavigation<Nav>();
  const { keyword } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '검색 결과',
      headerRight: renderHeaderCartButton,
    });
  }, [navigation]);

  const [sort, setSort] = useState<SortKey>('distance');

  const filters: BaseFilters = useMemo(
    () => ({
      category: null,
      keyword,
      sort: sortMap[sort],
      limit: 10,
    }),
    [keyword, sort]
  );

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteStoreList(filters);

  const stores: Store[] = useMemo(() => {
    const all = data?.pages.flatMap((p) => p.stores) ?? [];
    return all.filter((s, i, arr) => arr.findIndex((x) => x.id === s.id) === i);
  }, [data]);

  const rows: Row[] = useMemo(() => [{ __type: 'sticky' }, ...stores], [stores]);

  // 스크롤 상태 관리
  const scrollKey = useMemo(
    () => `${queryKeys.STORE}:${filters.sort}:${filters.keyword ?? ''}`,
    [filters]
  );
  const listRef = useRef<FlatList<Row>>(null);
  const setOffset = useListScrollStore((s) => s.setOffset);
  const getOffset = useListScrollStore((s) => s.getOffset);
  const clearOffset = useListScrollStore((s) => s.clearOffset);

  const lastYRef = useRef(0);
  const isFirstFocusRef = useRef(true);
  const endReachedDuringMomentum = useRef(false);
  const layoutHeightRef = useRef(0);
  const contentHeightRef = useRef(0);

  const isScrollable = () => contentHeightRef.current > layoutHeightRef.current + 8;

  useEffect(() => {
    isFirstFocusRef.current = true;
    clearOffset(scrollKey);
    lastYRef.current = 0;
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    });
  }, [scrollKey, clearOffset]);

  useFocusEffect(
    useCallback(() => {
      if (isFirstFocusRef.current) {
        isFirstFocusRef.current = false;
        requestAnimationFrame(() => {
          listRef.current?.scrollToOffset({ offset: 0, animated: false });
        });
      } else {
        const y = getOffset(scrollKey);
        if (y != null) {
          requestAnimationFrame(() => {
            listRef.current?.scrollToOffset({ offset: y, animated: false });
          });
        }
      }
    }, [getOffset, scrollKey])
  );

  const goDetail = useCallback(
    (item: Store) => {
      queryClient.removeQueries({
        queryKey: [queryKeys.STORE, queryKeys.GET_STORE_DETAIL],
        exact: false,
      });
      navigation.navigate(userNavigations.STORE_DETAIL, { storeId: item.id, storeName: item.name });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Row; index: number }) => {
      if ('__type' in item) {
        return (
          <StickyControls
            sort={sort}
            onChangeSort={(k) => setSort(k)}
            searchDefaultValue={keyword}
            onSubmitKeyword={(q) => navigation.setParams({ keyword: q })}
          />
        );
      }
      const isFirstStore = index === 1;
      const isLastStore = index === rows.length - 1;
      return (
        <Pressable
          onPress={() => goDetail(item)}
          style={[
            styles.cardContainer,
            isFirstStore && styles.storeListFirst,
            isLastStore && styles.storeListLast,
          ]}
        >
          <StoreListCard item={item} />
        </Pressable>
      );
    },
    [rows.length, sort, goDetail, keyword, navigation]
  );

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      lastYRef.current = y;
      setOffset(scrollKey, y);
    },
    [scrollKey, setOffset]
  );

  const onMomentumScrollBegin = () => {
    endReachedDuringMomentum.current = false;
  };

  const onEndReached = useCallback(() => {
    if (!isScrollable()) return;
    if (endReachedDuringMomentum.current) return;
    if (hasNextPage && !isFetchingNextPage) {
      endReachedDuringMomentum.current = true;
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    layoutHeightRef.current = e.nativeEvent.layout.height;
  }, []);
  const onContentSizeChange = useCallback((w: number, h: number) => {
    contentHeightRef.current = h;
  }, []);

  if (isError) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ marginBottom: 12, color: colors.BLACK }}>
          검색 결과를 불러오지 못했어요.
        </Text>
        <Pressable
          onPress={() => refetch()}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: colors.BLACK,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: colors.WHITE }}>다시 시도</Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <FlatList<Row>
        ref={listRef}
        data={rows}
        keyExtractor={(item, index) =>
          '__type' in item ? '__sticky__' : `store-${item.id}-${index}`
        }
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        onContentSizeChange={onContentSizeChange}
        ListEmptyComponent={
          <View style={{ paddingVertical: 48, alignItems: 'center' }}>
            <Text style={{ color: colors.BLACK, marginBottom: 8 }}>조건에 맞는 가게가 없어요.</Text>
            <Pressable
              onPress={() => {
                navigation.setParams({ keyword: '' });
                setSort('distance');
                refetch();
              }}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                backgroundColor: colors.BLACK,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: colors.WHITE }}>필터 초기화</Text>
            </Pressable>
          </View>
        }
        ListFooterComponent={<LoadingFooter visible={!!isFetchingNextPage} />}
        style={styles.rootContainer}
        removeClippedSubviews
        windowSize={10}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        refreshControl={
          <RefreshControl
            refreshing={!!isFetching && !isFetchingNextPage}
            onRefresh={() => refetch()}
          />
        }
      />
    </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  rootContainer: { backgroundColor: colors.WHITE },
  container: { flex: 1 },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.WHITE,
  },
  storeListFirst: { marginTop: 15 },
  storeListLast: { marginBottom: 15 },
});
