import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { kakaoLogin } from '@/api/auth';
import Kakao from '@/assets/icons/kakao.svg';
import { loggedOutNavigations } from '@/constants/navigations';
import { LoggedOutStackParamList } from '@/navigations/stack/LoggedOutStackNavigator';

type NavigationProp = StackNavigationProp<
  LoggedOutStackParamList,
  typeof loggedOutNavigations.LOGIN
>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePressSignup = () => {
    navigation.navigate(loggedOutNavigations.SIGNUP_TYPE);
  };

  const getFcmToken = async () => {
    const fcmToken = await getToken(getMessaging());
    return fcmToken;
  };

  const handleKakaoLogin = async (): Promise<void> => {
    const deviceToken = await getFcmToken();
    console.log(`deviceToken: ${deviceToken}`);

    // 1) 카카오톡 로그인 시도
    KakaoLogin.login()
      // 2) 사용자가 톡에서 취소하면 계정(웹뷰)으로 폴백
      .catch((err) => {
        if (err?.code === 'E_CANCELLED_OPERATION') {
          console.log('Talk 취소 → 계정(웹) 로그인 시도');
          return KakaoLogin.loginWithKakaoAccount();
        }
        // 그 외 에러는 상위 catch로
        return Promise.reject(err);
      })
      // 3) 카카오 로그인 성공 시 백엔드로 교환
      .then((res) => {
        if (!res?.accessToken) {
          return Promise.reject(new Error('No Kakao access token'));
        }
        const accessToken = res.accessToken;
        // 네 API: POST /api/auth/login/members { accessToken }
        return kakaoLogin(accessToken);
      })
      // 4) 우리 토큰 수령 → 저장/네비게이션
      .then((tokens) => {
        // saveTokens(tokens);
        // navigation.replace('UserTabs');
        console.log('서버 토큰 발급 OK');
        console.log(`tokens: ${tokens}`);
      })
      // 5) 에러 공통 처리(404 → 회원가입)
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          // (선택) 카카오 프로필 프리필
          KakaoLogin.getProfile()
            .then(() => {
              navigation.navigate(loggedOutNavigations.SIGNUP_TYPE);
            })
            .catch(() => {
              navigation.navigate(loggedOutNavigations.SIGNUP_TYPE);
            });
          return;
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
      colors={['#88DE46', '#02B856']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.loginView}>
          <Image source={require('@/assets/images/refood.webp')} style={styles.logo} />
          <View>
            <Text style={styles.title}>{'Walk, Eat, Save'}</Text>
            <Text style={styles.subTitle}>{'환경과 함께하는 똑똑한 한 끼'}</Text>
            <Text style={styles.logoTitle}>{'RE:FOOD'}</Text>
          </View>
        </View>
        <View style={styles.imgContainer}>
          <Image source={require('@/assets/images/login-img.webp')} style={styles.loginImg} />
        </View>
        <TouchableOpacity onPress={handleKakaoLogin} style={styles.btnContainer}>
          <View style={styles.btnInner}>
            <Kakao width={20} height={20} style={styles.kakaoIcon} />
            <Text style={styles.kakaoText}>카카오로 시작하기</Text>
            {/* dummy view */}
            <View style={styles.kakaoIcon} />
          </View>
        </TouchableOpacity>

        {/* TODO: 테스트 코드 추후 삭제 */}
        <View style={{ flexDirection: 'row', gap: 15, paddingHorizontal: 30 }}>
          <TouchableOpacity onPress={handlePressSignup}>
            <Text>{'Test: 회원가입 유형 선택'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 45,
  },
  loginView: {
    marginTop: 55,
    marginHorizontal: 27,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
    aspectRatio: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 22,
    marginLeft: 10,
  },
  subTitle: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Medium',
    fontSize: 20,
    marginLeft: 10,
  },
  logoTitle: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 20,
    marginLeft: 10,
  },
  imgContainer: {
    width: '100%',
    height: 200,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  loginImg: {
    width: 222,
    height: 205,
    aspectRatio: 1,
  },
  btnContainer: {
    marginHorizontal: 27,
    height: 45,
    backgroundColor: '#FEE500',
    borderRadius: 8,
    justifyContent: 'center',
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  kakaoIcon: {
    width: 24,
    height: 24,
  },
  kakaoText: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: '#000000',
  },
});

export default LoginScreen;
