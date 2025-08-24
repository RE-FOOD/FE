import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from '@/components/_common/RestaurantList';
import Sort from '@/components/_common/Sort';
import { colors } from '@/constants/colors';
import { Like } from '@/types/domain';

const restaurantData: Like[] = [
  {
    id: 1,
    name: '비스티버거',
    rating: 3.5,
    review: 1030,
    near: 1.9,
    discount: 40,
    image: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 2,
    name: '비스티버거',
    rating: 4.2,
    review: 1,
    near: 0.8,
    discount: 20,
    image: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 3,
    name: '버거킹',
    rating: 4.2,
    review: 1200,
    near: 2.5,
    discount: 20,
    image: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 4,
    name: '비스티버거',
    rating: 3.8,
    review: 1200,
    near: 1.2,
    discount: 20,
    image: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 5,
    name: '쉑쉑버거',
    rating: 4.5,
    review: 2100,
    near: 3.1,
    discount: 15,
    image: 'https://picsum.photos/300/200?random=2',
  },
];

type SortType = 'near' | 'review' | 'rating';

const LikeHomeScreen = () => {
  const [sortType, setSortType] = useState<SortType>('near');
  const [restaurants, setRestaurants] = useState(restaurantData);

  const handleSortChange = (type: SortType) => {
    setSortType(type);
    //정렬 로직
    const sortedData = [...restaurants].sort((a, b) => {
      switch (type) {
        case 'near':
          return a.near - b.near;
        case 'review':
          return b.review - a.review;
        case 'rating':
          return b.rating - a.rating;
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.WHITE,
    gap: 20,
  },
});

export default LikeHomeScreen;
