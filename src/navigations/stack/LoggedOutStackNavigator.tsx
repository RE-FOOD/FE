import React from 'react';
import {loggedOutNavigations} from '@/constants/navigations';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@/screens/auth/LoginScreen';

export type LoggedOutStackParamList = {
  [loggedOutNavigations.LOGIN]: undefined;
};

const Stack = createStackNavigator<LoggedOutStackParamList>();

function LoggedOutStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={loggedOutNavigations.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default LoggedOutStackNavigator;
