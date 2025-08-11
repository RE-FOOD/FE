import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

type Props = { visible: boolean };

const LoadingFooter = ({ visible }: Props) => {
  if (!visible) return null;
  return (
    <View style={{ paddingVertical: 16 }}>
      <ActivityIndicator />
    </View>
  );
};

export default memo(LoadingFooter);
