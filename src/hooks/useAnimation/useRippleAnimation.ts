import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useRippleAnimation = (delay: number = 0) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 2,
            duration: 2500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 3500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1000),
      ])
    );

    const timer = setTimeout(() => animation.start(), delay);
    return () => clearTimeout(timer);
  }, [scale, opacity, delay]);

  return { scale, opacity };
};
