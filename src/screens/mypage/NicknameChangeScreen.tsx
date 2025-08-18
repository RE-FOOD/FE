import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import NicknameInput from '@/components/signup/NicknameInput';
import { colors } from '@/constants/colors';

type Status = 'none' | 'valid' | 'invalid' | 'duplicated';

const NicknameChangeScreen = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameStatus, setNicknameStatus] = useState<Status>('none');
  const [nicknameErrorVisible, setNicknameErrorVisible] = useState(false);

  const onChangeNickname = (val: string) => {
    setNickname(val);
    if (nicknameStatus === 'valid') setNicknameStatus('invalid');
    setNicknameErrorVisible(false);
  };

  const onCheckNickname = async () => {
    if (!nickname.trim()) {
      setNicknameStatus('none');
      setNicknameErrorVisible(true);
      return;
    }
    const isDup = false; // 예시
    setNicknameStatus(isDup ? 'duplicated' : 'valid');
    setNicknameErrorVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.grayRegularText}>닉네임</Text>
        <NicknameInput
          nickname={nickname}
          onChangeNickname={onChangeNickname}
          onCheckNickname={onCheckNickname}
          nicknameStatus={nicknameStatus}
          nicknameErrorVisible={nicknameErrorVisible}
          setNicknameStatus={setNicknameStatus}
          setNicknameErrorVisible={setNicknameErrorVisible}
        />
      </View>
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.whiteRegularText_14}>변경완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 24,
    gap: 13,
  },
  button: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: colors.GREEN,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bottomArea: {
    marginTop: 'auto',
  },
  submitButton: {
    height: 50,
    backgroundColor: colors.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackRegularText_16: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
  },
  blackBoldText_16: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  grayRegularText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
  },
  grayRegularText_13: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  greenRegularText_13: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  whiteRegularText_14: {
    color: colors.WHITE,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
});
export default NicknameChangeScreen;
