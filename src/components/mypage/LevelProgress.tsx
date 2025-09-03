import React, { useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  /** 0 ~ 1 사이 값 (채워질 비율) */
  value?: number;
  /** 바 높이(px) */
  height?: number;
  /** 라벨 목록 (없으면 라벨 영역 숨김) */
  labels?: string[];
  /** 그라디언트 색상 [start, end] */
  colors?: [string, string];
  /** 트랙(배경) 색상 */
  trackColor?: string;
  /** 외부 컨테이너 스타일 추가 */
  style?: ViewStyle;
  /** 라벨 텍스트 스타일 추가 */
  labelStyle?: TextStyle;
  /** 애니메이션 사용 여부 */
  animated?: boolean;
  /** 모서리 둥글게(알약 형태) */
  rounded?: boolean;
};

function LevelProgress({
  value = 0,
  height = 14,
  labels = [],
  colors = ['#FF6A3D', '#FF9E7A'],
  trackColor = 'rgba(255,106,61,0.2)',
  style,
  labelStyle,
  animated = true,
  rounded = true,
}: Props) {
  const clamped = Math.max(0, Math.min(1, value));
  const anim = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    if (!animated) {
      anim.setValue(clamped);
      return;
    }
    Animated.timing(anim, {
      toValue: clamped,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [clamped, animated, anim]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const radius = rounded ? height / 2 : 4;

  return (
    <View style={[styles.wrap, style]}>
      {/* 트랙 */}
      <View style={[styles.track, { height, borderRadius: radius, backgroundColor: trackColor }]}>
        {/* 채워지는 부분 */}
        <Animated.View style={{ width, height, overflow: 'hidden', borderRadius: radius }}>
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      {/* 라벨 */}
      {labels.length > 0 && (
        <View style={styles.labels}>
          {labels.map((t, i) => (
            <Text key={`${t}-${i}`} style={[styles.label, labelStyle]}>
              {t}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  track: {},
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  label: { color: '#777', fontSize: 12, fontFamily: 'Pretendard-Bold' },
});

export default memo(LevelProgress);
