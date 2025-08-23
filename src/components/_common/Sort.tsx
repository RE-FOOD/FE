import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';

const Sort = () => {
  return (
    <View>
      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sort}>
          <Text style={styles.blackRegularText_14}>가까운 순</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sort}>
          <Text style={styles.blackRegularText_14}>리뷰 순</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sort}>
          <Text style={styles.blackRegularText_14}>평점 순</Text>
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
  blackRegularText_14: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
});

export default Sort;
