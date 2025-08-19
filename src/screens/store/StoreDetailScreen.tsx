import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/constants/colors';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Rt = RouteProp<UserStackParamList, 'StoreDetail'>;
type Nav = StackNavigationProp<UserStackParamList, 'StoreDetail'>;

const StoreDetailScreen = () => {
  const { params } = useRoute<Rt>();
  const navigation = useNavigation<Nav>();
  const { storeId, storeName } = params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: storeName });
  }, [navigation, storeName]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, color: colors.BLACK }}>가게 ID: {storeId}</Text>
    </View>
  );
};

export default StoreDetailScreen;
