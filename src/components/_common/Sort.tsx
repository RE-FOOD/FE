import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { StoreSortOption } from '@/types/domain';

interface SortProps {
  onSortChange: (type: StoreSortOption) => void;
  currentSort: StoreSortOption;
}

const Sort: React.FC<SortProps> = ({ onSortChange, currentSort }) => {
  const handleSortPress = (type: StoreSortOption): void => {
    onSortChange(type);
  };
  return (
    <View>
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sort, currentSort === 'NEAR' && styles.activeSort]}
          onPress={() => handleSortPress('NEAR')}
        >
          <Text style={[styles.blackRegularText_14, currentSort === 'NEAR' && styles.activeText]}>
            가까운 순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sort, currentSort === 'REVIEW' && styles.activeSort]}
          onPress={() => handleSortPress('REVIEW')}
        >
          <Text style={[styles.blackRegularText_14, currentSort === 'REVIEW' && styles.activeText]}>
            리뷰순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sort, currentSort === 'RATING' && styles.activeSort]}
          onPress={() => handleSortPress('RATING')}
        >
          <Text style={[styles.blackRegularText_14, currentSort === 'RATING' && styles.activeText]}>
            평점순
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
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
    fontFamily: 'Pretendard-Regular',
    color: colors.GREEN,
    fontSize: 14,
  },
});

export default Sort;
