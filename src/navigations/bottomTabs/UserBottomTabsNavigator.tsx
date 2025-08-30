import React from 'react';
import { SvgProps } from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FavoriteActive from '@/assets/icons/favorite-active.svg';
import Favorite from '@/assets/icons/favorite.svg';
import HomeActive from '@/assets/icons/home-active.svg';
import Home from '@/assets/icons/home.svg';
import MapActive from '@/assets/icons/map-active.svg';
import Map from '@/assets/icons/map.svg';
import MyActive from '@/assets/icons/my-active.svg';
import My from '@/assets/icons/my.svg';
import OrderActive from '@/assets/icons/order-active.svg';
import Order from '@/assets/icons/order.svg';

import { userNavigations } from '@/constants/navigations';
import HistoryHomeScreen from '@/screens/history/HistoryHomeScreen';
import LikeHomeScreen from '@/screens/like/LikeHomeScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import MypageHomeScreen from '@/screens/mypage/MypageHomeScreen';
import StoreHomeScreen from '@/screens/store/StoreHomeScreen';

export type UserBottomTabsParamList = {
  [userNavigations.STORE_HOME]: undefined;
  [userNavigations.MAP_HOME]: undefined;
  [userNavigations.LIKE_HOME]: undefined;
  [userNavigations.HISTORY_HOME]: { deletedOrderId?: number; nonce?: number } | undefined;
  [userNavigations.MYPAGE_HOME]: undefined;
};

const Tab = createBottomTabNavigator<UserBottomTabsParamList>();

type SvgComponent = (props: SvgProps) => JSX.Element;

const renderTabIcon = (focused: boolean, ActiveIcon: SvgComponent, InactiveIcon: SvgComponent) =>
  focused ? <ActiveIcon width={28} height={28} /> : <InactiveIcon width={28} height={28} />;

function UserBottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00A146',
        tabBarInactiveTintColor: '#9C9C9C',
        headerShown: false,
        tabBarStyle: {
          height: 73,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          padding: 6, // 아이템 내부 패딩
          justifyContent: 'center',
          maxWidth: 76,
          alignContent: 'center',
        },
        tabBarLabelStyle: {
          marginTop: 2,
          fontFamily: 'Pretendard-Medium',
          fontSize: 12,
        },
        popToTopOnBlur: true,
      }}
      initialRouteName={userNavigations.STORE_HOME}
    >
      <Tab.Screen
        name={userNavigations.STORE_HOME}
        component={StoreHomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => renderTabIcon(focused, HomeActive, Home),
        }}
      />
      <Tab.Screen
        name={userNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          title: '주변가게',
          tabBarIcon: ({ focused }) => renderTabIcon(focused, MapActive, Map),
        }}
      />
      <Tab.Screen
        name={userNavigations.LIKE_HOME}
        component={LikeHomeScreen}
        options={{
          title: '찜',
          tabBarIcon: ({ focused }) => renderTabIcon(focused, FavoriteActive, Favorite),
        }}
      />
      <Tab.Screen
        name={userNavigations.HISTORY_HOME}
        component={HistoryHomeScreen}
        options={{
          title: '주문내역',
          tabBarIcon: ({ focused }) => renderTabIcon(focused, OrderActive, Order),
        }}
      />
      <Tab.Screen
        name={userNavigations.MYPAGE_HOME}
        component={MypageHomeScreen}
        options={{
          title: 'MY',
          tabBarIcon: ({ focused }) => renderTabIcon(focused, MyActive, My),
        }}
      />
    </Tab.Navigator>
  );
}

export default UserBottomTabsNavigator;
