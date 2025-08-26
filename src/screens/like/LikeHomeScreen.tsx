import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from '@/components/_common/RestaurantList';
import Sort from '@/components/_common/Sort';
import { colors } from '@/constants/colors';
import { StoreSortOption, Like } from '@/types/domain';

const restaurantData: Like[] = [
  {
    id: 1,
    name: '비스티버거',
    status: 'OPEN',
    ratingAvg: 3.5,
    count: 1030,
    distance: 1.9,
    salePercent: 40,
    imageUrl: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 2,
    name: '비스티버거',
    status: 'CLOSE',
    ratingAvg: 4.2,
    count: 1,
    distance: 0.8,
    salePercent: 20,
    imageUrl: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 3,
    name: '버거킹',
    status: 'OPEN',
    ratingAvg: 4.2,
    count: 1200,
    distance: 2.5,
    salePercent: 20,
    imageUrl: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 4,
    name: '비스티버거',
    status: 'OPEN',
    ratingAvg: 3.8,
    count: 1200,
    distance: 1.2,
    salePercent: 20,
    imageUrl: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 5,
    name: '쉑쉑버거',
    status: 'CLOSE',
    ratingAvg: 4.5,
    count: 2100,
    distance: 3.1,
    salePercent: 15,
    imageUrl: 'https://picsum.photos/300/200?random=2',
  },
];

const LikeHomeScreen = () => {
  const [sortType, setSortType] = useState<StoreSortOption>('NEAR');
  const [restaurants, setRestaurants] = useState(restaurantData);

  const handleSortChange = (type: StoreSortOption) => {
    setSortType(type);
    //정렬 로직
    const sortedData = [...restaurants].sort((a, b) => {
      switch (type) {
        case 'NEAR':
          return a.distance - b.distance;
        case 'REVIEW':
          return b.count - a.count;
        case 'RATING':
          return b.ratingAvg - a.ratingAvg;
      }
    });
    setRestaurants(sortedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Sort onSortChange={handleSortChange} currentSort={sortType} />
      <Image restaurants={restaurants} />
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
});

export default LikeHomeScreen;
