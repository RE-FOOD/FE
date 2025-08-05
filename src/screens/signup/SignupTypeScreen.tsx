import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import { colors } from '@/constants/colors';

const SignupTypeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoMessage}>
        <Text style={{ fontFamily: 'Pretendard-SemiBold', fontSize: 20, color: colors.BLACK }}>
          {'회원 유형 선택'}
        </Text>
        <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 14, color: '#929292' }}>
          {'가입하려는 회원 유형을 선택해주세요.'}
        </Text>
      </View>
      <View style={{ width: '100%', gap: 30, flexDirection: 'column' }}>
        <Shadow
          distance={10}
          startColor="rgba(0, 0, 0, 0.04)"
          offset={[0, 0]}
          style={{ alignSelf: 'stretch' }}
        >
          <View style={styles.typeContainer}>
            <View style={{ gap: 5 }}>
              <Text style={styles.type}>{'개인 회원'}</Text>
              <Text style={styles.typeInfo}>{'주변 가게의 메뉴를 확인하고 픽업해보세요.'}</Text>
            </View>
            <TouchableOpacity style={styles.userBtn}>
              <Text style={styles.btnText}>{'개인 회원 회원가입'}</Text>
            </TouchableOpacity>
          </View>
        </Shadow>
        {/* 여기 가로로 주고 싶은데 안됨 */}
        <Shadow
          distance={10}
          startColor="rgba(0, 0, 0, 0.04)"
          offset={[0, 0]}
          style={{ alignSelf: 'stretch' }}
        >
          <View style={styles.typeContainer}>
            <View style={{ gap: 5 }}>
              <Text style={styles.type}>{'사업자 회원'}</Text>
              <Text style={styles.typeInfo}>{'매장을 등록하고 주문을 받아보세요.'}</Text>
            </View>
            <TouchableOpacity style={styles.sellerBtn}>
              <Text style={styles.btnText}>{'사업자 회원 회원가입'}</Text>
            </TouchableOpacity>
          </View>
        </Shadow>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 30,
    gap: 35,
  },
  infoMessage: {
    alignItems: 'center',
    gap: 8,
  },
  typeContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    paddingHorizontal: 23,
    paddingVertical: 20,
    gap: 15,
  },
  type: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  typeInfo: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  userBtn: {
    width: '100%',
    height: 38,
    backgroundColor: colors.GREEN,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  sellerBtn: {
    width: '100%',
    height: 38,
    backgroundColor: '#323232',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.WHITE,
    textAlign: 'center',
    // AOS
    includeFontPadding: false,
  },
});

export default SignupTypeScreen;
