import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckIcon from '@/assets/icons/msg-check.svg';
import ErrorIcon from '@/assets/icons/msg-error.svg';
import { colors } from '@/constants/colors';

type ValidationMessageProps = {
  type: 'success' | 'error';
  message: string;
};

const ValidationMessage = ({ type, message }: ValidationMessageProps) => {
  const isError = type === 'error';
  const Icon = isError ? ErrorIcon : CheckIcon;

  return (
    <View style={styles.container}>
      <Icon width={16} height={16} />
      <Text style={[styles.message, isError ? styles.error : styles.success]}>{message}</Text>
    </View>
  );
};

export default ValidationMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  message: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
  error: {
    color: colors.RED,
  },
  success: {
    color: '#079500',
  },
});
