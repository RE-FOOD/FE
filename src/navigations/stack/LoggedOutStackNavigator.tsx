import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from '@/components/_common/BackButton';
import { loggedOutNavigations } from '@/constants/navigations';
import LoginScreen from '@/screens/auth/LoginScreen';
import DaumPostcodeScreen from '@/screens/signup/DaumPostcodeScreen';
import SellerSignupScreen from '@/screens/signup/SellerSignupScreen';
import SignupTypeScreen from '@/screens/signup/SignupTypeScreen';
import UserSignupScreen from '@/screens/signup/UserSignupScreen';
import { DaumPostcodeData } from '@/types/postcode';

export type LoggedOutStackParamList = {
  [loggedOutNavigations.LOGIN]: undefined;
  [loggedOutNavigations.SIGNUP_TYPE]: undefined;
  [loggedOutNavigations.USER_SIGNUP]: { selectedAddress?: DaumPostcodeData } | undefined;
  [loggedOutNavigations.SELLER_SIGNUP]: undefined;
  [loggedOutNavigations.DAUM_POSTCODE]: undefined;
};

const Stack = createStackNavigator<LoggedOutStackParamList>();

function LoggedOutStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'Pretendard-Medium',
          fontSize: 17,
        },
        headerLeft: BackButton,
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
      <Stack.Screen
        name={loggedOutNavigations.DAUM_POSTCODE}
        component={DaumPostcodeScreen}
        options={{ headerShown: true, title: '주소 검색' }}
      />
    </Stack.Navigator>
  );
}

export default LoggedOutStackNavigator;
