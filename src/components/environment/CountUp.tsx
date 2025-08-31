import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TextStyle } from 'react-native';

interface CountUpProps {
  toValue: number;
  duration?: number; // 애니메이션 지속 시간
  color?: string;
  style?: TextStyle;
}

const CountUp: React.FC<CountUpProps> = ({ toValue, duration = 1000, color, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start();

    const listenerId = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value));
    });

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [toValue, duration, animatedValue]);

  return (
    <Text
      style={[{ fontSize: 24, fontFamily: 'Pretendard-SemiBold', marginBottom: 5, color }, style]}
    >
      {displayValue.toLocaleString()}
    </Text>
  );
};

export default CountUp;
