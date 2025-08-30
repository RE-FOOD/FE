import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Back from '@/assets/icons/back.svg';

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 25 }}>
      <Back width={24} height={24} />
    </Pressable>
  );
};
