import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Check from '@/assets/icons/msg-check.svg';
import Error from '@/assets/icons/msg-error.svg';
import { colors } from '@/constants/colors';

type Props = {
  nickname: string;
  onChangeNickname: (val: string) => void;
  onCheckNickname: () => void;
  nicknameStatus: 'none' | 'valid' | 'invalid' | 'duplicated';
  nicknameErrorVisible: boolean;
  setNicknameStatus: (status: 'none' | 'valid' | 'invalid' | 'duplicated') => void;
  setNicknameErrorVisible: (val: boolean) => void;
};

const NicknameInput = ({
  nickname,
  onChangeNickname,
  onCheckNickname,
  nicknameStatus,
  nicknameErrorVisible,
  setNicknameStatus,
  setNicknameErrorVisible,
}: Props) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.nicknameWrapper}>
        <TextInput
          placeholder="닉네임을 입력해주세요."
          style={styles.nicknameInput}
          value={nickname}
          onChangeText={(text) => {
            onChangeNickname(text);
            if (nicknameStatus === 'valid') {
              setNicknameStatus('invalid');
              setNicknameErrorVisible(false);
            }
          }}
        />
        <TouchableOpacity style={styles.dupCheckBtnInside} onPress={onCheckNickname}>
          <Text style={styles.dupCheckText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      {/* 상태에 따른 메시지 */}
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
  );
};

const styles = StyleSheet.create({
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
});

export default NicknameInput;
