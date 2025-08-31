import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import CountUp from './CountUp';

interface MetricBoxProps {
  label: string;
  value: number;
  color: string;
  unit: string;
  unitStyle?: TextStyle;
}

export default function MetricBox({ label, value, color, unit, unitStyle }: MetricBoxProps) {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.valueRow}>
        <CountUp toValue={value} color={color} />
        <Text style={[styles.metricValue, { color }, unitStyle]}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  metricBox: {
    flex: 1,
    paddingVertical: 28,
    alignItems: 'center',
    gap: 7,
  },
  metricLabel: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Pretendard-Medium',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 5,
  },
});
