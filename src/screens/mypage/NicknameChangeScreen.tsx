import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NicknameInput from '@/components/signup/NicknameInput';
import { colors } from '@/constants/colors';
import { useCheckNickname } from '@/hooks/queries/useMember';
import { useUpdateNickname } from '@/hooks/queries/useMyPage';

type Status = 'none' | 'valid' | 'invalid' | 'duplicated' | 'invalidFormat';
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{1,6}$/;

const NicknameChangeScreen = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [nicknameStatus, setNicknameStatus] = useState<Status>('none');
  const [nicknameErrorVisible, setNicknameErrorVisible] = useState(false);

  const { mutate } = useUpdateNickname();
  const { refetch } = useCheckNickname(nickname, {
    enabled: false,
    refetchOnMount: false,
    retry: false,
  });

  const onChangeNickname = (val: string) => {
    setNickname(val);
    if (nicknameStatus === 'valid') setNicknameStatus('invalid');
    setNicknameErrorVisible(false);
  };

  const onCheckNickname = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      setNicknameStatus('none');
      setNicknameErrorVisible(true);
      return;
    }

    if (!NICKNAME_REGEX.test(trimmed)) {
      setNicknameStatus('invalidFormat');
      setNicknameErrorVisible(true);
      return;
    }

    try {
      const response = await refetch();

      if (response.data) {
        setNicknameStatus('valid');
      } else {
        setNicknameStatus('duplicated');
      }

      setNicknameErrorVisible(true);
    } catch (error) {
      console.error('닉네임 중복 확인 실패', error);
      setNicknameStatus('duplicated');
      setNicknameErrorVisible(true);
    }
  };

  const onSubmit = () => {
    if (!nickname.trim()) {
      setNicknameStatus('none');
      setNicknameErrorVisible(true);
      return;
    }
    if (nicknameStatus !== 'valid') {
      setNicknameErrorVisible(true);
      return;
    }
    mutate(
      { nickname },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
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
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
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
