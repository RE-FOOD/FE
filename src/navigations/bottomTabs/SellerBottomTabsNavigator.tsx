import React from 'react';
import { SvgProps } from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MenuItem } from '../stack/SellerStackNavigator';
import AcceptActive from '@/assets/icons/accept-active.svg';
import Accept from '@/assets/icons/accept.svg';
import MenuActive from '@/assets/icons/menu-active.svg';
import Menu from '@/assets/icons/menu.svg';
import MyActive from '@/assets/icons/my-active.svg';
import My from '@/assets/icons/my.svg';

import { sellerNavigations } from '@/constants/navigations';
import SellerMenuScreen from '@/screens/seller/SellerMenuScreen';
import SellerMypageScreen from '@/screens/seller/SellerMypageScreen';
import SellerOrderScreen from '@/screens/seller/SellerOrderScreen';

export type SellerBottomTabsParamList = {
  [sellerNavigations.MENU_HOME]: { updatedMenu?: MenuItem } | undefined;
  [sellerNavigations.ORDER_HOME]: undefined;
  [sellerNavigations.MYPAGE_HOME]: undefined;
};

const Tab = createBottomTabNavigator<SellerBottomTabsParamList>();

type SvgComponent = (props: SvgProps) => JSX.Element;

const renderTabIcon = (focused: boolean, ActiveIcon: SvgComponent, InactiveIcon: SvgComponent) =>
  focused ? <ActiveIcon width={28} height={28} /> : <InactiveIcon width={28} height={28} />;

function SellerBottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00A146',
        tabBarInactiveTintColor: '#9C9C9C',
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarStyle: {
          height: 73,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          padding: 6, // 아이템 내부 패딩
          justifyContent: 'center',
          maxWidth: 130,
          alignContent: 'center',
        },
        tabBarLabelStyle: {
          marginTop: 2,
          fontFamily: 'Pretendard-Medium',
          fontSize: 12,
        },
        headerTitleStyle: {
          fontFamily: 'Pretendard-Medium',
          fontSize: 17,
        },
        popToTopOnBlur: true,
      }}
      initialRouteName={sellerNavigations.MYPAGE_HOME}
    >
      <Tab.Screen
        name={sellerNavigations.MENU_HOME}
        component={SellerMenuScreen}
        options={{
          title: '메뉴관리',
          tabBarIcon: ({ focused }) => renderTabIcon(focused, MenuActive, Menu),
        }}
      />
      <Tab.Screen
        name={sellerNavigations.ORDER_HOME}
        component={SellerOrderScreen}
        options={{
          title: '주문접수',
          tabBarIcon: ({ focused }) => renderTabIcon(focused, AcceptActive, Accept),
        }}
      />
      <Tab.Screen
        name={sellerNavigations.MYPAGE_HOME}
        component={SellerMypageScreen}
        options={{
          title: 'MY',
          headerShown: false,
          tabBarIcon: ({ focused }) => renderTabIcon(focused, MyActive, My),
        }}
      />
    </Tab.Navigator>
  );
}

export default SellerBottomTabsNavigator;
