import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import PhonePrefixDropdown from './PhonePrefixDropdown';
import Error from '@/assets/icons/msg-error.svg';
import { colors } from '@/constants/colors';

type Props = {
  telPrefix: string;
  tel1: string;
  tel2: string;
  onTelPrefixChange: (next: string) => void;
  onTel1Change: (val: string) => void;
  onTel2Change: (val: string) => void;
  telError?: string;
};

const PhoneNumberInput = ({
  telPrefix,
  tel1,
  tel2,
  onTelPrefixChange,
  onTel1Change,
  onTel2Change,
  telError = '',
}: Props) => {
  const handleTel1Change = (text: string) => {
    const onlyNum = text.replace(/[^0-9]/g, '');
    onTel1Change(onlyNum);
  };

  const handleTel2Change = (text: string) => {
    const onlyNum = text.replace(/[^0-9]/g, '');
    onTel2Change(onlyNum);
  };

  return (
    <View style={{ gap: 7 }}>
      <View style={styles.phoneRow}>
        <PhonePrefixDropdown value={telPrefix} onChange={onTelPrefixChange} />
        <Text style={styles.telText}>-</Text>
        <View style={styles.telInput}>
          <TextInput
            style={styles.telText}
            keyboardType="number-pad"
            maxLength={4}
            value={tel1}
            onChangeText={handleTel1Change}
          />
        </View>
        <Text style={styles.telText}>-</Text>
        <View style={styles.telInput}>
          <TextInput
            style={styles.telText}
            keyboardType="number-pad"
            maxLength={4}
            value={tel2}
            onChangeText={handleTel2Change}
          />
        </View>
      </View>

      {telError !== '' && (
        <View style={styles.msgContainer}>
          <Error width={16} height={16} />
          <Text style={styles.errorMsg}>{telError}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
  },
  telInput: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  telText: {
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
    fontSize: 16,
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

export default PhoneNumberInput;
