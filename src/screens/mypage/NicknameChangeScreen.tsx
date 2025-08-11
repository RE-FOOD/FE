import { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Check from '@/assets/icons/msg-check.svg';
import { colors } from '@/constants/colors';

const NicknameChangeScreen = () => {
  const [text, setText] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.grayRegularText}>닉네임</Text>
        <View style={styles.nicknameContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={text}
              placeholder="닉네임을 입력하세요"
              onChangeText={setText}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.whiteRegularText_14}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hintRow}>
            <Check width={16} height={16} />
            <Text style={styles.greenRegularText_13}>사용 가능한 닉네임입니다.</Text>
          </View>
        </View>
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
  nicknameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 7,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
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
