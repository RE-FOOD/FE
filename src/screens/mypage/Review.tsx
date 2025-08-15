import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Trash from '@/assets/icons/trash.svg';
import { colors } from '@/constants/colors';

const Review = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.blackRegularText_20}>나의 리뷰 17개</Text>
      <View style={styles.listContainer}>
        <View style={styles.storeInfoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.blackRegularText_15}>알렉스 플레이스</Text>
            <TouchableOpacity style={styles.deleteButton}>
              <Trash />
              <Text style={styles.grayRegularText_13}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.starContainer}>
              <FontAwesome name="star" size={15} color={'#FFD700'} />
              <FontAwesome name="star" size={15} color={'#FFD700'} />
              <FontAwesome name="star" size={15} color={'#FFD700'} />
              <FontAwesome name="star" size={15} color={'#FFD700'} />
              <FontAwesome name="star" size={15} color={'#FFD700'} />
            </View>
            <Text style={styles.grayRegularText_13}>2025-07-30</Text>
          </View>
        </View>
        <Text style={styles.blackRegularText_13}>항상 맛있게 잘 먹고있습니다.</Text>
        <View style={styles.menuContainer}>
          <View style={styles.menuInfo}>
            <Text style={styles.grayRegularText_13}>더블 치즈 버거</Text>
          </View>
          <View style={styles.menuInfo}>
            <Text style={styles.grayRegularText_13}>더블 치즈 버거</Text>
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.storeInfoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.blackRegularText_15}>알렉스 플레이스</Text>
            <TouchableOpacity style={styles.deleteButton}>
              <Trash />
              <Text style={styles.grayRegularText_13}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.starContainer}>
              <FontAwesome name="star" size={15} color={'#FFD700'} />
              <FontAwesome name="star" size={15} color={'#FFD700'} />
              <FontAwesome name="star" size={15} color={'#FFD700'} />
              <FontAwesome name="star" size={15} color={'#FFD700'} />
              <FontAwesome name="star" size={15} color={'#FFD700'} />
            </View>
            <Text style={styles.grayRegularText_13}>2025-07-30</Text>
          </View>
        </View>
        <Text style={styles.blackRegularText_13}>항상 맛있게 잘 먹고있습니다.</Text>
        <View style={styles.menuContainer}>
          <View style={styles.menuInfo}>
            <Text style={styles.grayRegularText_13}>더블 치즈 버거</Text>
          </View>
          <View style={styles.menuInfo}>
            <Text style={styles.grayRegularText_13}>더블 치즈 버거</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 25,
    backgroundColor: colors.WHITE,
  },
  listContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',

    gap: 8,
  },
  storeInfoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuInfo: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: colors.GRAY_700,
    borderWidth: 1,
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: colors.GRAY_200,
    borderRadius: 10,
    gap: 2,
  },
  blackRegularText_20: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 20,
  },
  blackRegularText_15: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
  },
  blackRegularText_13: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 13,
  },
  grayRegularText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  grayRegularText_13: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  greenRegularText_13: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  orangeBoldText_13: {
    color: '#FF704F',
    fontFamily: 'Pretendard-Bold',
    fontSize: 13,
  },

  logoutWrapper: {
    paddingVertical: 20,
  },
  logoutText: {
    fontSize: 14,
    color: colors.GRAY_700,
    textDecorationLine: 'underline',
    fontFamily: 'Pretendard-Regular',
  },
});

export default Review;
