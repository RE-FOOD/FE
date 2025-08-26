import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface HeartIconProps {
  isFavorite: boolean;
  onPress: () => void;
  width?: number;
  height?: number;
}

const HeartIcon = ({ isFavorite, onPress, width = 24, height = 24 }: HeartIconProps) => {
  return (
    // 아이콘 주변의 터치 영역을 넓혀 사용성을 개선합니다.
    <TouchableOpacity onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Svg width={width} height={height} viewBox="0 0 24 24">
        <Path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={isFavorite ? '#FF6B6B' : 'none'}
          stroke={isFavorite ? '#FF6B6B' : '#CCCCCC'}
          strokeWidth="2"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default HeartIcon;
