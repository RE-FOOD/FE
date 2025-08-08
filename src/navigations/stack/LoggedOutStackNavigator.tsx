import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { loggedOutNavigations } from '@/constants/navigations';
import LoginScreen from '@/screens/auth/LoginScreen';
import SellerSignupScreen from '@/screens/signup/SellerSignupScreen';
import SignupTypeScreen from '@/screens/signup/SignupTypeScreen';
import UserSignupScreen from '@/screens/signup/UserSignupScreen';

export type LoggedOutStackParamList = {
  [loggedOutNavigations.LOGIN]: undefined;
  [loggedOutNavigations.SIGNUP_TYPE]: undefined;
  [loggedOutNavigations.USER_SIGNUP]: undefined;
  [loggedOutNavigations.SELLER_SIGNUP]: undefined;
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
      <Stack.Screen
        name={loggedOutNavigations.SIGNUP_TYPE}
        component={SignupTypeScreen}
        options={{ headerShown: true, title: '회원가입' }}
      />
      <Stack.Screen
        name={loggedOutNavigations.USER_SIGNUP}
        component={UserSignupScreen}
        options={{ headerShown: true, title: '회원가입' }}
      />
      <Stack.Screen
        name={loggedOutNavigations.SELLER_SIGNUP}
        component={SellerSignupScreen}
        options={{ headerShown: true, title: '회원가입' }}
      />
    </Stack.Navigator>
  );
}

export default LoggedOutStackNavigator;
