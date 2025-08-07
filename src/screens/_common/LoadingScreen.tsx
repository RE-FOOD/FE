import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.GREEN} />
    </View>
  );
}

export default LoadingScreen;
