import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
        <View style={styles.btnContainer}>
          <View style={styles.btnInner}>
            <Kakao width={20} height={20} style={styles.kakaoIcon} />
            <Text style={styles.kakaoText}>카카오로 시작하기</Text>
            {/* dummy view */}
            <View style={styles.kakaoIcon} />
          </View>
        </View>

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
