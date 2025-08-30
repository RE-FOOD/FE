import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

const SellerOrderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <View style={styles.textContainer}>
            <TouchableOpacity>
              <Text style={styles.blackRegularText_15}>신규처리중</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.blackRegularText_15}>완료</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.whiteRegularText_15}>영업중</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.innerListContainer}>
            <View style={styles.textListContainer}>
              <Text style={styles.blackBoldText_20}>19:30</Text>
              <Text style={styles.blackBoldText_20}>하와이안 피자 외 1게</Text>
              <Text style={styles.grayRegularText_14}>결재완료 28,600원</Text>
            </View>
            <TouchableOpacity style={styles.orderRectangle}>
              <Text style={styles.whiteRegularText_20}>접수</Text>
            </TouchableOpacity>
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
    alignItems: 'flex-start',
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 24,
  },
  topContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 117,
  },
  textContainer: {
    flexDirection: 'row',
    gap: 27,
  },
  textListContainer: {
    flexDirection: 'column',
  },
  listContainer: {
    paddingVertical: 27,
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
  innerListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rectangle: {
    paddingVertical: 4,
    paddingHorizontal: 18,
    backgroundColor: '#1A7DFF',
    borderRadius: 20,
  },
  orderRectangle: {
    marginLeft: 'auto',
    paddingHorizontal: 37,
    paddingVertical: 23,
    backgroundColor: colors.GREEN,
    borderRadius: 10,
  },
  whiteRegularText_15: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.WHITE,
  },
  blackRegularText_15: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  blackBoldText_20: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  whiteRegularText_20: {
    fontSize: 20,
    fontFamily: 'Pretendard-Regular',
    color: colors.WHITE,
  },
  grayRegularText_14: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: colors.GRAY_700,
  },
});

export default SellerOrderScreen;
