import React from 'react';
import {
  // BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// import {UserStackParamList} from '../stack/UserStackNavigator';
import { userNavigations } from '@/constants/navigations';
import HistoryHomeScreen from '@/screens/history/HistoryHomeScreen';
import LikeHomeScreen from '@/screens/like/LikeHomeScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import MypageHomeScreen from '@/screens/mypage/MypageHomeScreen';
import StoreHomeScreen from '@/screens/store/StoreHomeScreen';

// interface UserBottomTabsNavigatorProps {
//   navigation: BottomTabNavigationProp<UserStackParamList>;
// }

export type UserBottomTabsParamList = {
  [userNavigations.STORE_HOME]: undefined;
  [userNavigations.MAP_HOME]: undefined;
  [userNavigations.LIKE_HOME]: undefined;
  [userNavigations.HISTORY_HOME]: undefined;
  [userNavigations.MYPAGE_HOME]: undefined;
};

const Tab = createBottomTabNavigator<UserBottomTabsParamList>();

function UserBottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={userNavigations.STORE_HOME}
    >
      <Tab.Screen
        name={userNavigations.STORE_HOME}
        component={StoreHomeScreen}
        options={{ title: '홈' }}
      />
      <Tab.Screen
        name={userNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{ title: '주변가게' }}
      />
      <Tab.Screen
        name={userNavigations.LIKE_HOME}
        component={LikeHomeScreen}
        options={{ title: '찜' }}
      />
      <Tab.Screen
        name={userNavigations.HISTORY_HOME}
        component={HistoryHomeScreen}
        options={{ title: '주문내역' }}
      />
      <Tab.Screen
        name={userNavigations.MYPAGE_HOME}
        component={MypageHomeScreen}
        options={{ title: 'MY' }}
      />
    </Tab.Navigator>
  );
}

export default UserBottomTabsNavigator;
