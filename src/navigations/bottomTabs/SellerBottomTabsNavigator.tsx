import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { sellerNavigations } from '@/constants/navigations';
import SellerMenuScreen from '@/screens/seller/SellerMenuScreen';
import SellerMypageScreen from '@/screens/seller/SellerMypageScreen';
import SellerOrderScreen from '@/screens/seller/SellerOrderScreen';

export type SellerBottomTabsParamList = {
  [sellerNavigations.MENU_HOME]: undefined;
  [sellerNavigations.ORDER_HOME]: undefined;
  [sellerNavigations.MYPAGE_HOME]: undefined;
};

const Tab = createBottomTabNavigator<SellerBottomTabsParamList>();

function SellerBottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={sellerNavigations.MYPAGE_HOME}
    >
      <Tab.Screen
        name={sellerNavigations.MENU_HOME}
        component={SellerMenuScreen}
        options={{ title: '메뉴관리' }}
      />
      <Tab.Screen
        name={sellerNavigations.ORDER_HOME}
        component={SellerOrderScreen}
        options={{ title: '주문접수' }}
      />
      <Tab.Screen
        name={sellerNavigations.MYPAGE_HOME}
        component={SellerMypageScreen}
        options={{ title: 'MY' }}
      />
    </Tab.Navigator>
  );
}

export default SellerBottomTabsNavigator;
