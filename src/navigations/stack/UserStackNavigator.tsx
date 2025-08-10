import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserBottomTabsNavigator, {
  UserBottomTabsParamList,
} from '../bottomTabs/UserBottomTabsNavigator';
import { userNavigations } from '@/constants/navigations';
import HistoryDetailScreen from '@/screens/history/HistoryDetailScreen';
import ReviewWriteScreen from '@/screens/history/ReviewWriteScreen';
import CouponBox from '@/screens/mypage/CouponBox';
import NicknameChangeScreen from '@/screens/mypage/NicknameChangeScreen';

export type UserStackParamList = {
  UserTabs: NavigatorScreenParams<UserBottomTabsParamList>;
  [userNavigations.STORE_HOME]: undefined;
  [userNavigations.ORDER_DETAIL]: {
    orderId: number;
  };
  [userNavigations.REVIEW_WRITE]: undefined;
  [userNavigations.NiCKNAME_CHANGE]: undefined;
  [userNavigations.COUPON_BOX]: undefined;
};

const Stack = createStackNavigator<UserStackParamList>();

function UserStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="UserTabs"
        component={UserBottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={HistoryDetailScreen}
        options={{ title: '주문 상세', headerShown: true }}
      />
      <Stack.Screen
        name="ReviewWrite"
        component={ReviewWriteScreen}
        options={{ title: '리뷰 작성', headerShown: true }}
      />
      <Stack.Screen
        name="NicknameChange"
        component={NicknameChangeScreen}
        options={{ title: '닉네임 변경', headerShown: true }}
      />
      <Stack.Screen
        name="CouponBox"
        component={CouponBox}
        options={{ title: '쿠폰함', headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default UserStackNavigator;
