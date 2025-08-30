import React from 'react';
import { Animated, StyleSheet } from 'react-native';

export const RippleCircle = ({
  scale,
  opacity,
}: {
  scale: Animated.Value;
  opacity: Animated.Value;
}) => <Animated.View style={[styles.rippleCircle, { transform: [{ scale }], opacity }]} />;

const styles = StyleSheet.create({
  rippleCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00883B',
    opacity: 0.3,
  },
});
