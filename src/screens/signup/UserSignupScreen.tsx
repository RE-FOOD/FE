import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
import DaumPostcode from './DaumPostcode';
import NicknameInput from '@/components/signup/NicknameInput';
import PhoneNumberInput from '@/components/signup/PhoneNumberInput';
import RegionSelector from '@/components/signup/RegionSelector';
import { colors } from '@/constants/colors';
import { DaumPostcodeData } from '@/types/postcode';

const UserSignupScreen = () => {
  const navigation = useNavigation();

  const [nickname, setNickname] = useState('');
  const [nicknameStatus, setNicknameStatus] = useState<'none' | 'valid' | 'invalid' | 'duplicated'>(
    'none'
  );
  const [nicknameErrorVisible, setNicknameErrorVisible] = useState(false);

  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [telPrefix, setTelPrefix] = useState('010');
  const [telError, setTelError] = useState('');

  const [region, setRegion] = useState('');
  const [isPostcodeMode, setIsPostcodeMode] = useState(false);
  const [regionError, setRegionError] = useState('');

  const isPhoneValid = useCallback(() => {
    return tel1.length === 4 && tel2.length === 4;
  }, [tel1, tel2]);

  useEffect(() => {
    if (telError !== '' && isPhoneValid()) {
      setTelError('');
    }
  }, [telError, isPhoneValid]);

  useEffect(() => {
    if (regionError && region.trim() !== '') {
      setRegionError('');
    }
  }, [region, regionError]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !isPostcodeMode,
    });
  }, [isPostcodeMode, navigation]);

  const allValid = nicknameStatus === 'valid' && isPhoneValid();

  // TODO: 임시 처리, 추후 API 연결
  const checkNickname = () => {
    if (nickname.trim() === '') {
      setNicknameStatus('none');
      setNicknameErrorVisible(true);
    } else if (nickname === '리푸드') {
      setNicknameStatus('valid');
      setNicknameErrorVisible(true);
    } else if (nickname === '리푸') {
      setNicknameStatus('duplicated');
      setNicknameErrorVisible(true);
    } else {
      setNicknameStatus('invalid');
      setNicknameErrorVisible(true);
    }
  };

  const handleSignup = () => {
    let hasError = false;

    const trimmed = nickname.trim();

    if (trimmed === '') {
      setNicknameStatus('none');
      setNicknameErrorVisible(true);
      hasError = true;
    } else if (!nicknameErrorVisible) {
      if (nicknameStatus !== 'valid') {
        setNicknameStatus('invalid');
        setNicknameErrorVisible(true);
        hasError = true;
      }
    } else {
      if (nicknameStatus !== 'valid') {
        hasError = true;
      }
    }

    if (!isPhoneValid()) {
      setTelError('000-0000-0000 형식으로 입력해주세요.');
      hasError = true;
    } else {
      setTelError('');
    }

    if (!region || region.trim() === '') {
      setRegionError('지역을 설정해주세요.');
      hasError = true;
    } else {
      setRegionError('');
    }

    if (hasError) return;

    // 회원가입 처리
    const _phoneNumber = `${telPrefix}${tel1}${tel2}`;
  };

  const handleDaumPostcode = (data: DaumPostcodeData) => {
    const fullAddress = data.address;
    setRegion(fullAddress);
    setIsPostcodeMode(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isPostcodeMode ? (
        <DaumPostcode onSubmit={handleDaumPostcode} />
      ) : (
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
              <View style={{ gap: 7 }}>
                <Text style={styles.title}>닉네임</Text>
                <Text style={styles.subTitle}>마이페이지에서 수정할 수 있어요</Text>
              </View>

              <NicknameInput
                nickname={nickname}
                onChangeNickname={setNickname}
                onCheckNickname={checkNickname}
                nicknameStatus={nicknameStatus}
                nicknameErrorVisible={nicknameErrorVisible}
                setNicknameErrorVisible={setNicknameErrorVisible}
                setNicknameStatus={setNicknameStatus}
              />
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

            <View style={styles.boxContainer}>
              <View style={{ gap: 7 }}>
                <Text style={styles.title}>지역</Text>
                <Text style={styles.subTitle}>선택하신 지역을 기준으로 주변 가게를 보여드려요</Text>
              </View>
              <RegionSelector
                region={region}
                regionError={regionError}
                onPress={() => setIsPostcodeMode(true)}
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
      )}
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
