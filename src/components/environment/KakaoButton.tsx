import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Kakao from '@/assets/icons/kakao.svg';

interface KakaoButtonProps {
  onPress: () => void;
}

export default function KakaoButton({ onPress }: KakaoButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <View style={styles.btnInner}>
        <Kakao width={20} height={20} />
        <Text style={styles.kakaoText}>카카오로 시작하기</Text>
        <View style={{ width: 20 }} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    height: 45,
    backgroundColor: '#FEE500',
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
  },
  kakaoText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: '#000',
  },
});
