import { StyleSheet, Text, View } from 'react-native';
import StarRating from './StarRating';
import { colors } from '@/constants/colors';
import { Review } from '@/types/domain';
import { formatDate } from '@/utils/format';

const ReviewItem = ({ review }: { review: Review }) => (
  <View style={styles.reviewItem}>
    <View style={{ gap: 9 }}>
      <View style={styles.topRow}>
        <Text style={styles.nickname}>{review.nickname}</Text>
        <View style={styles.ratingRow}>
          <StarRating rating={review.rating} />
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        </View>
      </View>

      <Text style={styles.content}>{review.content}</Text>
    </View>

    <View style={styles.menuRow}>
      {review.menus.map((menu, idx) => (
        <View key={idx} style={styles.menuTag}>
          <Text style={styles.menuText}>{menu}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default ReviewItem;

const styles = StyleSheet.create({
  reviewItem: {
    gap: 9,
    paddingBottom: 30,
  },
  topRow: {
    gap: 3,
  },
  nickname: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: colors.BLACK,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  date: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#9C9C9C',
  },
  content: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#000000',
  },
  menuRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  menuTag: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 9,
  },
  menuText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#555',
  },
});
