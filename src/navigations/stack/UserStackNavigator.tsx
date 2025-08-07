import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserBottomTabsNavigator, {
  UserBottomTabsParamList,
} from '../bottomTabs/UserBottomTabsNavigator';
import { userNavigations } from '@/constants/navigations';
import HistoryDetailScreen from '@/screens/history/HistoryDetailScreen';

export type UserStackParamList = {
  UserTabs: NavigatorScreenParams<UserBottomTabsParamList>;
  [userNavigations.STORE_HOME]: undefined;
  [userNavigations.ORDER_DETAIL]: { orderId: number; store: string; menu: string; date: string };
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
    </Stack.Navigator>
  );
}

export default UserStackNavigator;
