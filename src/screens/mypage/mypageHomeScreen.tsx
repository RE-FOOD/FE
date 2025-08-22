import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Arrow from '@/assets/icons/arrow.svg';
import LevelProgress from '@/components/mypage/LevelProgress';
import { colors } from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';
import { useMyPage } from '@/hooks/queries/useMyPage';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { toLevelLabel, getLevelImage } from '@/utils/level';

type NavigationProp = StackNavigationProp<UserStackParamList, 'NicknameChange'>;

const MypageHomeScreen = () => {
  const { logoutMutation } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const { data, isLoading, error } = useMyPage();

  if (isLoading) return <Text>로딩중</Text>;
  if (error) return <Text>불러오기 실패</Text>;
  const me = data?.data;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#88DE46', '#02B856']}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={styles.profileContainer}
      >
        <View style={styles.innerContainer}>
          <View style={styles.profileInnerContainer}>
            <View>
              <Image source={getLevelImage(me?.environmentLevel)} style={styles.logo} />
            </View>
            <View style={styles.couponContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.blackBoldText_16}>{me?.nickname}님, 안녕하세요!</Text>
                <Text style={styles.grayRegularText}>{me?.email}</Text>
              </View>
            </View>
          </View>
          <View style={styles.levelContainer}>
            <View style={styles.levelTextContainer}>
              <View style={styles.levelTextBox}>
                <Text style={styles.grayRegularText}>현재 레벨</Text>
                <Text style={styles.greenRegularText_13}>{toLevelLabel(me?.environmentLevel)}</Text>
              </View>
              <View style={styles.levelRemindTextBox}>
                <Text style={styles.grayRegularText}>다음 레벨까지 남은 환경 점수</Text>
                <Text style={styles.orangeBoldText_13}>130점</Text>
              </View>
            </View>
            <LevelProgress
              value={me?.environmentScore} // %로 수정 요청
              labels={['LEVEL1', 'LEVEL2', 'LEVEL3', 'LEVEL4']}
              height={16}
              colors={['#FF6A3D', '#FFC0A3']}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('NicknameChange')}
        >
          <View style={styles.itemTextContainer}>
            <Text style={styles.blackRegularText_16}>닉네임 변경</Text>
            <Arrow />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('GreenReport')}
        >
          <View style={styles.itemTextContainer}>
            <Text style={styles.blackRegularText_16}>환경 리포트</Text>
            <Arrow />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Review')}
        >
          <View style={styles.itemTextContainer}>
            <Text style={styles.blackRegularText_16}>리뷰 관리</Text>
            <Arrow />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Private')}
        >
          <View style={styles.itemTextContainer}>
            <Text style={styles.blackRegularText_16}>개인정보처리방침 </Text>
            <Arrow />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Rule')}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.blackRegularText_16}>운영약관 </Text>
            <Arrow />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="link"
          hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
          style={styles.logoutWrapper}
          activeOpacity={0.6}
        >
          <Text onPress={() => logoutMutation.mutate(null)} style={styles.logoutText}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  gradient: {
    flex: 1,
  },
  logo: {
    width: 73,
    height: 73,
  },
  innerContainer: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
  profileContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: 'column',
    gap: 10,
  },
  profileInnerContainer: {
    flexDirection: 'row',
    gap: 68,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  couponContainer: {
    alignItems: 'flex-end',
    gap: 15,
  },
  levelContainer: {
    gap: 5,
  },
  levelTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 85,
  },
  listContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    height: 69,
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 27,
    justifyContent: 'space-between',
  },
  levelTextBox: {
    alignItems: 'flex-start',
  },
  levelRemindTextBox: {
    alignItems: 'flex-end',
  },
  coupon: {
    flexDirection: 'row',
    width: 73,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    borderRadius: 5,
    backgroundColor: '#FFE8E2',
  },

  blackRegularText_16: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
  },
  blackBoldText_16: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
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

export default MypageHomeScreen;
