import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Check from '@/assets/icons/msg-check.svg';
import Error from '@/assets/icons/msg-error.svg';
import PhoneNumberInput from '@/components/signup/PhoneNumberInput';
import { colors } from '@/constants/colors';

const UserSignupScreen = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameStatus, setNicknameStatus] = useState<'none' | 'valid' | 'invalid' | 'duplicated'>(
    'none'
  );
  const [nicknameErrorVisible, setNicknameErrorVisible] = useState(false);

  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [telPrefix, setTelPrefix] = useState('010');
  const [telError, setTelError] = useState('');

  const isPhoneValid = useCallback(() => {
    return tel1.length === 4 && tel2.length === 4;
  }, [tel1, tel2]);

  useEffect(() => {
    if (telError !== '' && isPhoneValid()) {
      setTelError('');
    }
  }, [telError, isPhoneValid]);

  const allValid = nicknameStatus === 'valid' && isPhoneValid();

  const checkNickname = () => {
    if (nickname.trim() === '') {
      setNicknameStatus('none'); // 공백 입력
    } else if (nickname === '리푸드') {
      setNicknameStatus('valid');
    } else if (nickname === '리푸') {
      setNicknameStatus('duplicated');
    } else {
      setNicknameStatus('invalid');
    }
  };

  const handleSignup = () => {
    let hasError = false;

    const trimmed = nickname.trim();

    if (trimmed === '') {
      // 무조건 닉네임 입력 메시지
      setNicknameStatus('none');
      setNicknameErrorVisible(true);
      hasError = true;
    } else if (!nicknameErrorVisible) {
      // 닉네임 존재하지만 에러 메시지가 없을 때 → 중복 확인 요구
      if (nicknameStatus !== 'valid') {
        setNicknameStatus('invalid');
        setNicknameErrorVisible(true);
        hasError = true;
      }
    } else {
      // 에러 메시지가 있는 경우
      if (nicknameStatus !== 'valid') {
        hasError = true;
      }
    }

    // 휴대전화 유효성 검사
    if (!isPhoneValid()) {
      setTelError('000-0000-0000 형식으로 입력해주세요.');
      hasError = true;
    } else {
      setTelError('');
    }

    if (hasError) return;

    // 회원가입 처리
    const _phoneNumber = `${telPrefix}${tel1}${tel2}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.contentContainer}
      >
        {/* 닉네임 */}
        <View style={styles.boxContainer}>
          <View style={{ gap: 7 }}>
            <Text style={styles.title}>닉네임</Text>
            <Text style={styles.subTitle}>마이페이지에서 수정할 수 있어요</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.nicknameWrapper}>
              <TextInput
                placeholder="닉네임을 입력해주세요."
                style={styles.nicknameInput}
                value={nickname}
                onChangeText={(text) => {
                  setNickname(text);
                  if (nicknameStatus === 'valid') {
                    setNicknameStatus('invalid');
                    setNicknameErrorVisible(false);
                  }
                }}
              />
              <TouchableOpacity style={styles.dupCheckBtnInside} onPress={checkNickname}>
                <Text style={styles.dupCheckText}>중복확인</Text>
              </TouchableOpacity>
            </View>

            {nicknameErrorVisible && nicknameStatus === 'valid' && (
              <View style={styles.msgContainer}>
                <Check width={15} height={18} />
                <Text style={styles.successMsg}>사용할 수 있는 닉네임입니다.</Text>
              </View>
            )}

            {nicknameErrorVisible && nicknameStatus === 'duplicated' && (
              <View style={styles.msgContainer}>
                <Error width={16} height={16} />
                <Text style={styles.errorMsg}>이미 사용 중인 닉네임입니다.</Text>
              </View>
            )}

            {nicknameErrorVisible && nicknameStatus === 'invalid' && nickname.trim() !== '' && (
              <View style={styles.msgContainer}>
                <Error width={16} height={16} />
                <Text style={styles.errorMsg}>닉네임 중복확인을 진행해주세요.</Text>
              </View>
            )}

            {nicknameErrorVisible && nicknameStatus === 'none' && (
              <View style={styles.msgContainer}>
                <Error width={16} height={16} />
                <Text style={styles.errorMsg}>닉네임을 입력해주세요.</Text>
              </View>
            )}
          </View>
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
          />
          {telError !== '' && (
            <View style={styles.msgContainer}>
              <Error width={16} height={16} />
              <Text style={styles.errorMsg}>{telError}</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={[styles.signupBtn, { backgroundColor: allValid ? colors.GREEN : '#D4D4D4' }]}
        onPress={handleSignup}
      >
        <Text style={styles.signupText}>회원가입 완료</Text>
      </TouchableOpacity>
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
  },
  nicknameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputContainer: {
    gap: 7,
  },
  nicknameWrapper: {
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nicknameInput: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  dupCheckBtnInside: {
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.GREEN,
    borderRadius: 6,
  },
  dupCheckBtn: {
    backgroundColor: colors.GREEN,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
  },
  dupCheckText: {
    color: colors.WHITE,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  successMsg: {
    color: '#00AA00',
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
  errorMsg: {
    color: colors.RED,
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
  },
  telPicker: {
    flexDirection: 'row',
    width: 90,
    height: 52,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
  },
  telInput: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  telText: {
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
    fontSize: 16,
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
  bottomErrorMsg: {
    textAlign: 'center',
    color: '#D90000',
    marginBottom: 8,
    fontSize: 13,
  },
});

export default UserSignupScreen;
