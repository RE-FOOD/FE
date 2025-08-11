import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

const CouponBox = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.blackRegularText_14}>보유쿠폰 3장</Text>
        <View style={styles.listContainer}>
          <Text style={styles.greenRegularText_24}>20% 할인</Text>
          <View style={styles.list}>
            <Text style={styles.blackBoldText_16}>환경쿠폰</Text>
            <Text style={styles.blackRegularText_12}>최소주문금액 없음</Text>
            <Text style={styles.blackRegularText_12}>2025년 10월 30일까지</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.greenRegularText_24}>20% 할인</Text>
          <View style={styles.list}>
            <Text style={styles.blackBoldText_16}>환경쿠폰</Text>
            <Text style={styles.blackRegularText_12}>최소주문금액 없음</Text>
            <Text style={styles.blackRegularText_12}>2025년 10월 30일까지</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.greenRegularText_24}>20% 할인</Text>
          <View style={styles.list}>
            <Text style={styles.blackBoldText_16}>환경쿠폰</Text>
            <Text style={styles.blackRegularText_12}>최소주문금액 없음</Text>
            <Text style={styles.blackRegularText_12}>2025년 10월 30일까지</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 25,
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    alignSelf: 'stretch',
    backgroundColor: colors.WHITE,
    elevation: 6,
    borderRadius: 20,
  },
  list: {
    gap: 5,
  },
  blackRegularText_12: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
  },
  blackRegularText_14: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  blackBoldText_16: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  grayRegularText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
  },
  grayRegularText_13: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  greenRegularText_24: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 24,
  },
  whiteRegularText_14: {
    color: colors.WHITE,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
});

export default CouponBox;
