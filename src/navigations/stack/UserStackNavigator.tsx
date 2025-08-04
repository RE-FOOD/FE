import React from 'react';
import {userNavigations} from '@/constants/navigations';
import {createStackNavigator} from '@react-navigation/stack';
import UserBottomTabsNavigator, {
  UserBottomTabsParamList,
} from '../bottomTabs/UserBottomTabsNavigator';
import {NavigatorScreenParams} from '@react-navigation/native';

export type UserStackParamList = {
  UserTabs: NavigatorScreenParams<UserBottomTabsParamList>;
  [userNavigations.STORE_HOME]: undefined;
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
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default UserStackNavigator;
