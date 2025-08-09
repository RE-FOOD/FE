import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CategoryHeader from '@/components/store/CategoryHeader';
import LoadingFooter from '@/components/store/LoadingFooter';
import StickyControls, { type SortKey } from '@/components/store/StickyControls';
import StoreCard, { StoreItem } from '@/components/store/StoreCard';
import { CategoryKey } from '@/constants/categoryImages';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Nav = StackNavigationProp<UserStackParamList, typeof userNavigations.CATEGORY_LIST>;
type Rt = RouteProp<UserStackParamList, typeof userNavigations.CATEGORY_LIST>;

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'korean', label: '한식' },
  { key: 'chinese', label: '중식' },
  { key: 'japanese', label: '일식' },
  { key: 'western', label: '양식' },
  { key: 'street', label: '분식' },
  { key: 'dessert', label: '디저트' },
];

const makeItem = (i: number): StoreItem => ({
  id: `c-${i}`,
  name: ['정식당', '판떡볶이', '능동타코집'][i % 3],
  distance: `${(Math.random() * 3 + 0.2).toFixed(1)}km`,
  rating: 3.8 + Math.random() * 1.2,
  ratingCnt: ['251', '1,030', '53'][i % 3],
  image: 'https://via.placeholder.com/300x180',
  price: `${(Math.random() * 9000 + 1000).toFixed(0)}원`,
  salePrice: `${(Math.random() * 9000 + 1000).toFixed(0)}원`,
});

type StickyRow = { __type: 'sticky' };
type Row = StickyRow | StoreItem;

const CategoryListScreen = () => {
  const route = useRoute<Rt>();
  const navigation = useNavigation<Nav>();
  const { key: selectedKey, label } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: label });
  }, [navigation, label]);

  const [sort, setSort] = useState<SortKey>('distance');
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageRef = useRef(0);

  useEffect(() => {
    pageRef.current = 0;
    const first = Array.from({ length: 10 }, (_, i) => makeItem(i));
    setItems(first);
  }, [selectedKey]);

  const sorted = useMemo(() => {
    const clone = [...items];
    if (sort === 'rating') clone.sort((a, b) => b.rating - a.rating);
    else if (sort === 'review') clone.sort((a, b) => (b.id > a.id ? 1 : -1));
    else clone.sort((a, b) => parseFloat(a.distance || '0') - parseFloat(b.distance || '0'));
    return clone;
  }, [items, sort]);

  const loadMore = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const base = (pageRef.current + 1) * 10;
      const next = Array.from({ length: 10 }, (_, i) => makeItem(base + i));
      setItems((prev) => [...prev, ...next]);
      pageRef.current += 1;
      setLoadingMore(false);
    }, 600);
  }, [loadingMore]);

  const onSelectCategory = useCallback(
    (c: { key: CategoryKey; label: string }) => {
      navigation.setParams({ key: c.key, label: c.label });
    },
    [navigation]
  );

  const rows: Row[] = useMemo(() => [{ __type: 'sticky' }, ...sorted], [sorted]);

  const keyExtractor = (item: Row, idx: number) =>
    '__type' in item ? '__sticky__' : item.id ?? String(idx);

  const navToResult = useCallback(
    (q: string) => navigation.navigate(userNavigations.SEARCH_RESULT, { keyword: q }),
    [navigation]
  );

  const renderItem = ({ item }: { item: Row }) => {
    if ('__type' in item) {
      return <StickyControls sort={sort} onChangeSort={setSort} onSubmitKeyword={navToResult} />;
    }
    return (
      <View style={styles.cardContainer}>
        <StoreCard item={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <CategoryHeader
            categories={CATEGORIES}
            selectedKey={selectedKey}
            onSelect={onSelectCategory}
          />
        }
        data={rows}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        ListFooterComponent={<LoadingFooter visible={loadingMore} />}
        style={styles.rootContainer}
        removeClippedSubviews
        windowSize={10}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
      />
    </View>
  );
};

export default CategoryListScreen;

const styles = StyleSheet.create({
  rootContainer: { backgroundColor: '#F6F6F6' },
  container: { flex: 1 },
  cardContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.WHITE,
  },
});
