import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Select from '@/assets/icons/arrow-down.svg';
import { colors } from '@/constants/colors';

interface Props {
  telPrefix: string;
  tel1: string;
  tel2: string;
  onTelPrefixChange: (next: string) => void;
  onTel1Change: (val: string) => void;
  onTel2Change: (val: string) => void;
}

const telOptions = ['010', '012', '011'];

const PhoneNumberInput = ({
  telPrefix,
  tel1,
  tel2,
  onTelPrefixChange,
  onTel1Change,
  onTel2Change,
}: Props) => {
  return (
    <View style={styles.phoneRow}>
      <TouchableOpacity
        style={styles.telPicker}
        onPress={() => {
          const index = telOptions.indexOf(telPrefix);
          const next = telOptions[(index + 1) % telOptions.length];
          onTelPrefixChange(next);
        }}
      >
        <Text style={styles.telText}>{telPrefix}</Text>
        <Select width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.telText}>-</Text>
      <View style={styles.telInput}>
        <TextInput
          style={styles.telText}
          keyboardType="number-pad"
          maxLength={4}
          value={tel1}
          onChangeText={(text) => onTel1Change(text.replace(/[^0-9]/g, ''))}
        />
      </View>
      <Text style={styles.telText}>-</Text>
      <View style={styles.telInput}>
        <TextInput
          style={styles.telText}
          keyboardType="number-pad"
          maxLength={4}
          value={tel2}
          onChangeText={(text) => onTel2Change(text.replace(/[^0-9]/g, ''))}
        />
      </View>
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
});

export default PhoneNumberInput;
