import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';

type SortType = 'near' | 'review' | 'rating';

interface SortProps {
  onSortChange: (type: SortType) => void;
  currentSort: SortType;
}

const Sort: React.FC<SortProps> = ({ onSortChange, currentSort }) => {
  const handleSortPress = (type: SortType): void => {
    onSortChange(type);
  };
  return (
    <View>
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sort, currentSort === 'near' && styles.activeSort]}
          onPress={() => handleSortPress('near')}
        >
          <Text style={[styles.blackRegularText_14, currentSort === 'near' && styles.activeText]}>
            가까운 순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sort, currentSort === 'review' && styles.activeSort]}
          onPress={() => handleSortPress('review')}
        >
          <Text style={[styles.blackRegularText_14, currentSort === 'review' && styles.activeText]}>
            리뷰순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sort, currentSort === 'rating' && styles.activeSort]}
          onPress={() => handleSortPress('rating')}
        >
          <Text style={[styles.blackRegularText_14, currentSort === 'rating' && styles.activeText]}>
            평점순
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    gap: 5,
  },
  sort: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderWidth: 1,
    borderRadius: 20,
  },
  activeSort: {
    borderColor: colors.GREEN,
  },
  blackRegularText_14: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  activeText: {
    color: colors.GREEN,
  },
});

export default Sort;
