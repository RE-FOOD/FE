import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import Kakao from '@/assets/icons/kakao.svg';
import { colors } from '@/constants/colors';
import { loggedOutNavigations } from '@/constants/navigations';
import useAuth from '@/hooks/queries/useAuth';
import { useGetReport } from '@/hooks/queries/useEnvironment';
import { LoggedOutStackParamList } from '@/navigations/stack/LoggedOutStackNavigator';
import { useAuthStore } from '@/zustand/useAuthStore';

type Nav = StackNavigationProp<LoggedOutStackParamList, typeof loggedOutNavigations.LOGIN>;

const LoginScreen = () => {
  const { loginMutation } = useAuth();
  const navigation = useNavigation<Nav>();
  const { data } = useGetReport();

  const getFcmToken = async () => {
    const fcmToken = await getToken(getMessaging());
    return fcmToken;
  };

  // const orderCount = data?.orderCount ?? 0;
  // const dishCount = data?.dishCount ?? 0;
  const totalTreesSaved = data?.totalTreesSaved ?? 0;
  const totalCarbonSaved = data?.totalCarbonSaved ?? 0;

  const handleKakaoLogin = async (): Promise<void> => {
    const deviceToken = await getFcmToken();
    let kakaoAccessToken: string | undefined;
    console.log(`deviceToken: ${deviceToken}`);

    // 1) 카카오톡 로그인 시도
    KakaoLogin.login()
      // 2) 사용자가 톡에서 취소하면 계정(웹뷰)으로 폴백
      .catch((err) => {
        if (err?.code === 'E_CANCELLED_OPERATION') {
          return KakaoLogin.loginWithKakaoAccount()
            .then((res) => Promise.resolve(res))
            .catch((err2) => Promise.reject(err2));
        }
        return Promise.reject(err);
      })
      // 3) 카카오 로그인 성공
      .then((res) => {
        if (!res?.accessToken) {
          return Promise.reject(new Error('No Kakao access token'));
        }
        kakaoAccessToken = res.accessToken;
        return loginMutation.mutateAsync({
          accessToken: kakaoAccessToken,
          fcmToken: deviceToken,
        });
      })
      .then((_tokens) => {
        console.log('서버 토큰 발급 성공');
      })
      // 5) 에러 공통 처리(404 → 회원가입)
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          useAuthStore.getState().setKakaoAccessToken(kakaoAccessToken);
          return KakaoLogin.getProfile()
            .then(() => {
              navigation.navigate(loggedOutNavigations.SIGNUP_TYPE);
            })
            .catch(() => {
              navigation.navigate(loggedOutNavigations.SIGNUP_TYPE);
            });
        }
        if (e?.code === 'E_CANCELLED_OPERATION') {
          // 계정(웹뷰)에서도 사용자가 취소한 경우
          console.log('사용자 취소');
          return;
        }
        console.log('로그인 오류:', e?.message || String(e));
      });
  };

  return (
    <LinearGradient
      colors={['#89E443', '#02B856']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.headerBox}>
            <Text style={styles.headerLabel}>리푸드의 환경 리포트</Text>
            <Text style={styles.title}>
              <Text style={styles.headerHighlight}>지구</Text>
              <Text>를 위한 발자국,{'\n'}얼마나 남겼을까요? 🌍</Text>
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.rowBox}>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>음식 구출 🍽️</Text>
                {/* <Text style={styles.metricValue1}>{orderCount.toLocaleString()}회</Text> */}
                <Text style={styles.metricValue1}>113,320회</Text>
              </View>
              <View style={styles.line} />
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>다회용기 사용 🥣</Text>
                <Text style={styles.metricValue2}>57,310회</Text>
                {/* <Text style={styles.metricValue2}>{dishCount.toLocaleString()}회</Text> */}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionText}>
                RE:FOOD 사용자가 구한 한 끼들이,{'\n'}
                나무 <Text style={styles.highlight1}>{totalTreesSaved.toLocaleString()}그루</Text>를
                심었어요! 🌲
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionText}>
                RE:FOOD와 함께,{'\n'}
                없앤 탄소는 약{' '}
                <Text style={styles.highlight2}>{totalCarbonSaved.toLocaleString()}kg</Text> ☁️
              </Text>
            </View>

            <View>
              <Text style={styles.footerText}>환경과 함께하는 똑똑한 한 끼 RE:FOOD</Text>

              <TouchableOpacity onPress={handleKakaoLogin} style={styles.btnContainer}>
                <View style={styles.btnInner}>
                  <Kakao width={20} height={20} />
                  <Text style={styles.kakaoText}>카카오로 시작하기</Text>
                  <View style={{ width: 20 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
  },
  headerBox: {
    width: '100%',
    paddingVertical: 35,
    gap: 13,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLabel: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    textAlign: 'center',
    lineHeight: 34,
  },
  headerHighlight: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: '#0FB758',
    lineHeight: 34,
  },
  bottomContainer: {
    width: '100%',
    gap: 30,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#EAEAEA',
    borderWidth: 1,
  },
  line: {
    width: 1,
    backgroundColor: '#EAEAEA',
    height: '100%',
  },
  metricBox: {
    flex: 1,
    paddingVertical: 28,
    alignItems: 'center',
    gap: 7,
  },
  metricLabel: {
    fontSize: 15,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
  },
  metricValue1: {
    fontSize: 24,
    fontFamily: 'Pretendard-SemiBold',
    color: '#0FB758',
    marginBottom: 5,
  },
  metricValue2: {
    fontSize: 24,
    fontFamily: 'Pretendard-SemiBold',
    color: '#5ED735',
    marginBottom: 5,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    width: '100%',
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#000',
    lineHeight: 24,
  },
  highlight1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    color: '#0FB758',
  },
  highlight2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    color: '#5ED735',
  },
  footerText: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
  },
  btnContainer: {
    marginHorizontal: 27,
    height: 45,
    backgroundColor: '#FEE500',
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
  },
  kakaoText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: '#000',
  },
});

export default LoginScreen;
