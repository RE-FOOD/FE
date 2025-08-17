import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import NicknameInput from '@/components/signup/NicknameInput';
import PhoneNumberInput from '@/components/signup/PhoneNumberInput';
import RegionSelector from '@/components/signup/RegionSelector';

import { colors } from '@/constants/colors';
import { loggedOutNavigations } from '@/constants/navigations';

import useAuth from '@/hooks/queries/useAuth';
import { useCheckNickname } from '@/hooks/queries/useMember';
import { LoggedOutStackParamList } from '@/navigations/stack/LoggedOutStackNavigator';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useSignupStore } from '@/zustand/useSignupStore';

type NavigationProp = StackNavigationProp<LoggedOutStackParamList>;

const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,6}$/; // 한글/영문/숫자 + 1~6자

const UserSignupScreen = () => {
  const { signupMutation, loginMutation } = useAuth();
  const kakaoAccessToken = useAuthStore((s) => s.kakaoAccessToken);
  const navigation = useNavigation<NavigationProp>();

  const { nickname, phone, region, setNickname, setPhone } = useSignupStore();

  const [nicknameStatus, setNicknameStatus] = useState<
    'none' | 'valid' | 'invalid' | 'duplicated' | 'invalidFormat'
  >('none');
  const [nicknameErrorVisible, setNicknameErrorVisible] = useState(false);

  const initial = useMemo(() => {
    if (phone && phone.length >= 10) {
      const prefix = phone.slice(0, 3);
      const mid = phone.slice(3, 7);
      const tail = phone.slice(7, 11);
      return { prefix, mid, tail };
    }
    return { prefix: '010', mid: '', tail: '' };
  }, [phone]);

  const [telPrefix, setTelPrefix] = useState(initial.prefix);
  const [tel1, setTel1] = useState(initial.mid);
  const [tel2, setTel2] = useState(initial.tail);
  const [telError, setTelError] = useState('');
  const [regionError, setRegionError] = useState('');

  const { refetch: refetchNickname } = useCheckNickname(nickname, { enabled: false });

  const isPhoneValid = useCallback(() => tel1.length === 4 && tel2.length === 4, [tel1, tel2]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      useSignupStore.getState().reset();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const full = `${telPrefix}${tel1}${tel2}`;
    setPhone(full);
  }, [telPrefix, tel1, tel2, setPhone]);

  useEffect(() => {
    if (telError && isPhoneValid()) setTelError('');
  }, [telError, isPhoneValid]);

  useEffect(() => {
    if (regionError && region.trim() !== '') setRegionError('');
  }, [region, regionError]);

  const allValid = nicknameStatus === 'valid' && isPhoneValid() && region.trim().length > 0;

  const checkNickname = async () => {
    const trimmed = nickname.trim();

    if (trimmed === '' || trimmed.length === 0) {
      setNicknameStatus('none');
      setNicknameErrorVisible(true);
      return;
    }
    if (!nicknameRegex.test(trimmed)) {
      setNicknameStatus('invalidFormat');
      setNicknameErrorVisible(true);
      return;
    }

    const res = await refetchNickname();
    const ok = res.data?.statusCode === 200;
    setNicknameStatus(ok ? 'valid' : 'duplicated');
    setNicknameErrorVisible(true);
  };

  const getFcmToken = async () => {
    const fcmToken = await getToken(getMessaging());
    return fcmToken;
  };

  const handleSignup = async () => {
    let hasError = false;

    const trimmed = nickname.trim();
    if (trimmed === '' || trimmed.length === 0) {
      setNicknameStatus('none');
      setNicknameErrorVisible(true);
      hasError = true;
    }
    if (nicknameStatus !== 'valid') {
      setNicknameErrorVisible(true);
      hasError = true;
    }
    if (!isPhoneValid()) {
      setTelError('000-0000-0000 형식으로 입력해주세요.');
      hasError = true;
    }
    if (!region.trim()) {
      setRegionError('지역을 설정해주세요.');
      hasError = true;
    }
    if (hasError) return;

    const deviceToken = await getFcmToken();
    // console.log(`kakaoToken: ${kakaoAccessToken}`);
    signupMutation.mutate(
      { kakaoAccessToken, phone, nickname, region },
      {
        onSuccess: () => {
          useAuthStore.getState().clear();
          useSignupStore.getState().reset();
          loginMutation.mutate({
            accessToken: kakaoAccessToken!,
            fcmToken: deviceToken,
          });
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
          {/* 닉네임 */}
          <View style={styles.boxContainer}>
            <View style={{ gap: 7 }}>
              <Text style={styles.title}>닉네임</Text>
              <Text style={styles.subTitle}>마이페이지에서 수정할 수 있어요</Text>
            </View>

            <NicknameInput
              nickname={nickname}
              onChangeNickname={(v) => {
                setNickname(v);
                // 입력 시 valid -> invalid
                if (nicknameStatus === 'valid') {
                  setNicknameStatus('invalid');
                  setNicknameErrorVisible(false);
                }
              }}
              onCheckNickname={checkNickname}
              nicknameStatus={nicknameStatus}
              nicknameErrorVisible={nicknameErrorVisible}
              setNicknameStatus={setNicknameStatus}
            />
          </View>

          {/* 휴대전화 */}
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

          {/* 지역 */}
          <View style={styles.boxContainer}>
            <View style={{ gap: 7 }}>
              <Text style={styles.title}>지역</Text>
              <Text style={styles.subTitle}>선택하신 지역을 기준으로 주변 가게를 보여드려요</Text>
            </View>
            <RegionSelector
              region={region}
              regionError={regionError}
              onPress={() => navigation.navigate(loggedOutNavigations.DAUM_POSTCODE)}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.signupBtn, { backgroundColor: allValid ? colors.GREEN : '#D4D4D4' }]}
          onPress={handleSignup}
        >
          <Text style={styles.signupText}>회원가입 완료</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  subTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#929292',
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

export default UserSignupScreen;
