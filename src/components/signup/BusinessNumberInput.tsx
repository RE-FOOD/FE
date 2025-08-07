import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import ErrorIcon from '@/assets/icons/msg-error.svg';
import { colors } from '@/constants/colors';

type Props = {
  value: string;
  onChange: (val: string) => void;
  error?: string;
};

const formatBusinessNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 10);
  const part1 = cleaned.slice(0, 3);
  const part2 = cleaned.slice(3, 5);
  const part3 = cleaned.slice(5, 10);
  return [part1, part2, part3].filter(Boolean).join('-');
};

const BusinessNumberInput = ({ value, onChange, error }: Props) => {
  const handleChange = (text: string) => {
    const numeric = text.replace(/\D/g, '').slice(0, 10);
    onChange(numeric);
  };

  return (
    <View style={{ gap: 7 }}>
      <View style={styles.inputWrapper}>
        <TextInput
          keyboardType="number-pad"
          value={formatBusinessNumber(value)}
          onChangeText={handleChange}
          placeholder="사업자 번호를 입력해주세요"
          style={styles.input}
        />
      </View>
      {error ? (
        <View style={styles.msgContainer}>
          <ErrorIcon width={16} height={16} />
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default BusinessNumberInput;

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  errorMsg: {
    color: colors.RED,
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
});
