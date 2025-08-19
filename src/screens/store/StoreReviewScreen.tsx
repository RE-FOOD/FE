import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ReviewItem from './ReviewItem';
import { colors } from '@/constants/colors';
import { Review } from '@/types/domain';

// 더미 데이터
const REVIEWS: Review[] = [
  {
    id: 1,
    nickname: '구해줘한끼',
    rating: 5,
    content: '항상 맛있게 잘 먹고 있습니다! 추천해요👍',
    createdAt: '2025-07-31',
    menus: ['더블 치즈 버거', '사이다'],
  },
  {
    id: 2,
    nickname: '연흘시',
    rating: 4,
    content: '항상 맛있게 잘 먹고 있습니다! 추천해요👍',
    createdAt: '2025-07-30',
    menus: ['더블 치즈 버거'],
  },
  {
    id: 3,
    nickname: '왕돈',
    rating: 4,
    content: '항상 맛있게 잘 먹고 있습니다! 추천해요👍',
    createdAt: '2025-02-05',
    menus: ['더블 치즈 버거'],
  },
  {
    id: 4,
    nickname: '코사',
    rating: 5,
    content: '항상 맛있게 잘 먹고 있습니다! 추천해요👍',
    createdAt: '2025-02-05',
    menus: ['더블 치즈 버거'],
  },
  {
    id: 5,
    nickname: '시스윌',
    rating: 3,
    content: '항상 맛있게 잘 먹고 있습니다! 추천해요👍',
    createdAt: '2025-02-05',
    menus: ['더블 치즈 버거'],
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
