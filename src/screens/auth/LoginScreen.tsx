import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import KakaoButton from '@/components/environment/KakaoButton';
import MetricBox from '@/components/environment/MetricBox';
import { colors } from '@/constants/colors';
import { loggedOutNavigations } from '@/constants/navigations';
import useAuth from '@/hooks/queries/useAuth';
// import { useGetReport } from '@/hooks/queries/useEnvironment';
import { LoggedOutStackParamList } from '@/navigations/stack/LoggedOutStackNavigator';
import { useAuthStore } from '@/zustand/useAuthStore';

type Nav = StackNavigationProp<LoggedOutStackParamList, typeof loggedOutNavigations.LOGIN>;

const LoginScreen = () => {
  const { loginMutation } = useAuth();
  const navigation = useNavigation<Nav>();
  const lottieRef = useRef<LottieView>(null);
  // const { data } = useGetReport();

  useEffect(() => {
    const timer = setTimeout(() => {
      lottieRef.current?.play();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await getToken(getMessaging());
    console.log(`fcmToken: ${fcmToken}`);
    return fcmToken;
  };

  // const orderCount = data?.orderCount ?? 0;
  // const dishCount = data?.dishCount ?? 0;
  // const totalTreesSaved = data?.totalTreesSaved ?? 0;
  // const totalCarbonSaved = data?.totalCarbonSaved ?? 0;

  const handleKakaoLogin = async (): Promise<void> => {
    const deviceToken = await getFcmToken();
    let kakaoAccessToken: string | undefined;

    KakaoLogin.login()
      .catch((err) => {
        if (err?.code === 'E_CANCELLED_OPERATION') {
          return KakaoLogin.loginWithKakaoAccount();
        }
        return Promise.reject(err);
      })
      .then((res) => {
        if (!res?.accessToken) throw new Error('No Kakao access token');
        kakaoAccessToken = res.accessToken;
        return loginMutation.mutateAsync({ accessToken: kakaoAccessToken, fcmToken: deviceToken });
      })
      .then(() => console.log('서버 토큰 발급 성공'))
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          useAuthStore.getState().setKakaoAccessToken(kakaoAccessToken);
          return KakaoLogin.getProfile().finally(() =>
            navigation.navigate(loggedOutNavigations.SIGNUP_TYPE)
          );
        }
        if (e?.code === 'E_CANCELLED_OPERATION') return;
        console.log('로그인 오류:', e?.message || String(e));
      });
  };

  return (
    <LinearGradient
      colors={['#A3F06A', '#33be6f']}
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
              {/* <MetricBox label="음식 구출 🍽️" value={orderCount} color="#0FB758" unit="회" /> */}
              <MetricBox label="음식 구출 🍽️" value={113320} color="#0FB758" unit="회" />
              <View style={styles.line} />
              {/* <MetricBox label="다회용기 사용 🥣" value={dishCount} color="#5ED735" unit="회" /> */}
              <MetricBox label="다회용기 사용 🥣" value={57310} color="#5ED735" unit="회" />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionText}>
                RE:FOOD 사용자가 구한 한 끼들이,{'\n'}
                {/* 나무 <Text style={styles.highlight1}>{totalTreesSaved.toLocaleString()}그루</Text>를 */}
                나무 <Text style={styles.highlight1}>{'2,870'}그루</Text>를 심었어요! 🌲
              </Text>
              <LottieView
                ref={lottieRef}
                source={require('@/assets/lottie/trees.json')}
                loop={false}
                style={{ width: 300, height: 201 }}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionText}>
                RE:FOOD와 함께,{'\n'}
                없앤 탄소는 약{' '}
                {/* <Text style={styles.highlight2}>{totalCarbonSaved.toLocaleString()}kg</Text> ☁️ */}
                <Text style={styles.highlight2}>{'57,300'}kg</Text> ☁️
              </Text>
              <LottieView
                source={require('@/assets/lottie/earth.json')}
                loop={false}
                autoPlay
                style={{ width: 300, height: 209 }}
              />
            </View>

            <View style={styles.btnSection}>
              <Text style={styles.footerText}>환경과 함께하는 똑똑한 한 끼 RE:FOOD</Text>
              <KakaoButton onPress={handleKakaoLogin} />
            </View>
          </View>
        </ScrollView>
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
  },
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
    borderBottomWidth: 2,
    borderBottomColor: '#0FB758',
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
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  sectionText: {
    width: '100%',
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#000',
    lineHeight: 27,
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
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium',
  },
  btnSection: {
    width: '100%',
    gap: 15,
  },
});

export default LoginScreen;
