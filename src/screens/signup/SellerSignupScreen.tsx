import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomModal from '@/components/_modal/CustomModal';
import BusinessNumberInput from '@/components/signup/BusinessNumberInput';
import PhoneNumberInput from '@/components/signup/PhoneNumberInput';
import { colors } from '@/constants/colors';
import { loggedOutNavigations } from '@/constants/navigations';
import useAuth from '@/hooks/queries/useAuth';
import { LoggedOutStackParamList } from '@/navigations/stack/LoggedOutStackNavigator';
import { showToast } from '@/utils/toast';
import { useAuthStore } from '@/zustand/useAuthStore';

type NavigationProp = StackNavigationProp<
  LoggedOutStackParamList,
  typeof loggedOutNavigations.SELLER_SIGNUP
>;

const SellerSignupScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const kakaoAccessToken = useAuthStore((s) => s.kakaoAccessToken);
  const { sellerSignupMutation } = useAuth();

  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [telPrefix, setTelPrefix] = useState('010');
  const [telError, setTelError] = useState('');

  const [bizNumber, setBizNumber] = useState('');
  const [bizNumberError, setBizNumberError] = useState('');

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const isPhoneValid = useCallback(() => {
    return tel1.length === 4 && tel2.length === 4;
  }, [tel1, tel2]);

  const isBusinessNumberValid = useCallback(() => {
    return bizNumber.length === 10;
  }, [bizNumber]);

  const allValid = isPhoneValid() && isBusinessNumberValid();

  useEffect(() => {
    if (telError !== '' && isPhoneValid()) {
      setTelError('');
    }
  }, [telError, isPhoneValid]);

  useEffect(() => {
    if (bizNumberError && isBusinessNumberValid()) {
      setBizNumberError('');
    }
  }, [bizNumber, bizNumberError, isBusinessNumberValid]);

  const handleSignup = () => {
    let hasError = false;

    if (!isBusinessNumberValid()) {
      setBizNumberError('사업자 번호는 10자리의 숫자로 입력해주세요.');
      hasError = true;
    } else {
      setBizNumberError('');
    }

    if (!isPhoneValid()) {
      setTelError('000-0000-0000 형식으로 입력해주세요.');
      hasError = true;
    } else {
      setTelError('');
    }

    if (hasError) return;

    const phone = `${telPrefix}${tel1}${tel2}`;
    sellerSignupMutation.mutate(
      { kakaoAccessToken, businessNumber: bizNumber, phone },
      {
        onSuccess: () => {
          setSuccessModalOpen(true);
        },
        onError: () => {
          showToast('error', '회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.');
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
          style={styles.contentContainer}
        >
          <View style={styles.boxContainer}>
            <Text style={styles.title}>사업자 번호</Text>
            <BusinessNumberInput value={bizNumber} onChange={setBizNumber} error={bizNumberError} />
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.title}>휴대전화</Text>
            <PhoneNumberInput
              telPrefix={telPrefix}
              tel1={tel1}
              tel2={tel2}
              onTelPrefixChange={setTelPrefix}
              onTel1Change={setTel1}
              onTel2Change={setTel2}
              telError={telError}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.signupBtn, { backgroundColor: allValid ? colors.GREEN : '#D4D4D4' }]}
          onPress={handleSignup}
        >
          <Text style={styles.signupText}>가입 신청</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <CustomModal
        state="SignUpSuccess"
        type="success"
        isOpen={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          navigation.navigate(loggedOutNavigations.LOGIN);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    padding: 30,
    gap: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  boxContainer: {
    gap: 13,
    marginBottom: 30,
  },
  signupBtn: {
    height: 69,
    justifyContent: 'center',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: colors.WHITE,
  },
});

export default SellerSignupScreen;
