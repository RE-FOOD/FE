import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { RippleCircle } from '@/components/order/RippleCircle';

type Ripple = {
  scale: Animated.Value;
  opacity: Animated.Value;
};

export const ProgressIndicator = ({
  ripples,
  activeStep = 0,
}: {
  ripples: Ripple[];
  activeStep?: number;
}) => (
  <View style={styles.container}>
    <View style={styles.circleRow}>
      <View style={styles.rippleContainer}>
        {ripples.map((r, i) => (
          <RippleCircle key={i} scale={r.scale} opacity={r.opacity} />
        ))}
        <View style={[styles.circle, styles.activeCircle]} />
      </View>
      <View style={styles.line} />
      <View style={styles.circle} />
      <View style={styles.line} />
      <View style={styles.circle} />
    </View>
    <View style={styles.step}>
      <Text style={[styles.stepLabel, activeStep === 0 && styles.activeLabel]}>결제완료</Text>
      <Text style={[styles.stepLabel, activeStep === 1 && styles.activeLabel]}>주문수락</Text>
      <Text style={[styles.stepLabel, activeStep === 2 && styles.activeLabel]}>픽업완료</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
  },
  activeCircle: {
    borderColor: '#00883B',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  line: {
    width: 85,
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 55,
  },
  stepLabel: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
    color: '#9D9D9D',
  },
  activeLabel: {
    fontSize: 13,
    color: '#00883B',
    fontFamily: 'Pretendard-SemiBold',
  },
});
