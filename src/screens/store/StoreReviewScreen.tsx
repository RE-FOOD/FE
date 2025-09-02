import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ReviewItem from '../../components/store/ReviewItem';
import { colors } from '@/constants/colors';
import { Review } from '@/types/domain';

// 더미 데이터
const REVIEWS: Review[] = [
  {
    id: 1,
    storeName: '구해줘한끼',
    rating: 5,
    content: '항상 맛있게 잘 먹고 있습니다! 추천해요👍',
    createdAt: '2025-09-31',
    menus: ['김치찌개'],
  },
  {
    id: 2,
    storeName: '연홍시',
    rating: 4,
    content: '양이 많고 푸짐합니다. 맛있게 잘 먹었습니다.',
    createdAt: '2025-07-30',
    menus: ['갈비찜'],
  },
  {
    id: 3,
    storeName: '왕돈',
    rating: 4,
    content: '갈비찜 맛집입니다~ 일주일에 두번은 먹어요',
    createdAt: '2025-05-05',
    menus: ['김치찌개'],
  },
  {
    id: 4,
    storeName: '코사',
    rating: 5,
    content: '고향이 생각나는 맛입니다. 번창하세요!',
    createdAt: '2025-04-05',
    menus: ['된장찌개'],
  },
  {
    id: 5,
    storeName: '시스원',
    rating: 3,
    content: '오늘도 맛있게 먹었습니다.',
    createdAt: '2025-03-05',
    menus: ['갈비찜'],
  },
];

const StoreReviewScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={styles.title}>리뷰 {REVIEWS.length}개</Text>

      {REVIEWS.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ScrollView>
  );
};

export default StoreReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: 20,
  },
});
