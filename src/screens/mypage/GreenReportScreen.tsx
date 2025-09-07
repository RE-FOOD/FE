import { StyleSheet, Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import LevelProgress from '@/components/mypage/LevelProgress';
import { colors } from '@/constants/colors';
import { useMyPage } from '@/hooks/queries/useMyPage';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { toLevelLabel, getLevelImage } from '@/utils/level';

type GreenReportRouteProp = RouteProp<UserStackParamList, 'GreenReport'>;

const GreenReport = () => {
  const route = useRoute<GreenReportRouteProp>();
  const { progress } = route.params;

  const { data } = useMyPage();
  const me = data?.data;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imgContainer}>
          <Image source={getLevelImage(me?.environmentLevel)} style={styles.logo} />
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.greenBoldText_20}>{toLevelLabel(me?.environmentLevel)}</Text>
          <Text style={styles.blackRegularText_13}>
            현재 {me?.nickname}님은 {toLevelLabel(me?.environmentLevel)} 등급입니다.
          </Text>
        </View>
        <LevelProgress
          value={progress}
          labels={['씨앗', '묘목', '나무', '사과나무']}
          height={16}
          colors={['#FF6A3D', '#FFC0A3']}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.glevelContainer}>
          <Text style={styles.greenBoldText_20}>환경 레벨이란?</Text>
          <Text style={styles.centerText}>
            사용자의 음식 구출 횟수, {'\n'} 다회용기 사용 횟수를 기준으로 {'\n'}
            환경 점수를 계산한 등급 제도입니다.
          </Text>
        </View>
        <View style={styles.glevelContainer}>
          <Text style={styles.greenBoldText_20}>환경 쿠폰 혜택</Text>
          <Text style={styles.centerText}>쿠폰 혜택 내용 기재</Text>
        </View>
        <View style={styles.savingContainer}>
          <View style={styles.round}>
            <Text style={styles.whiteBoldText_14}>상세 적립 기준</Text>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.blackRegularText_13}>① 주문 금액 250원당 1포인트 적립</Text>
            <Text style={styles.blackRegularText_13}>② 다회용기 사용 시 50포인트 적립</Text>
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
    backgroundColor: '#F6F6F6',
    gap: 20,
  },
  topContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    gap: 22,
    alignSelf: 'stretch',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 50,
  },
  bottomContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'column',
    gap: 25,
    alignSelf: 'stretch',
    backgroundColor: colors.WHITE,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '100%',
  },
  imgContainer: {
    alignItems: 'center',
  },
  levelContainer: {
    alignItems: 'center',
    gap: 3,
  },
  glevelContainer: {
    alignItems: 'center',
  },
  savingContainer: {
    width: '100%',
  },
  centerText: {
    textAlign: 'center',
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  logo: {
    width: 90,
    height: 90,
  },
  round: {
    alignSelf: 'center',
    paddingHorizontal: 13,
    paddingVertical: 5,
    alignItems: 'center',
    gap: 10,
    borderRadius: 20,
    position: 'absolute',
    top: -12,
    zIndex: 1,
    backgroundColor: colors.GREEN,
  },
  rectangle: {
    borderColor: colors.GREEN,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 28,
    paddingHorizontal: 50,
  },
  blackRegularText_13: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },

  whiteBoldText_14: {
    color: colors.WHITE,
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
  },
  greenBoldText_20: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
});

export default GreenReport;
