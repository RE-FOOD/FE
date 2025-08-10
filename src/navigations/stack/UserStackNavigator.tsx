import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserBottomTabsNavigator, {
  UserBottomTabsParamList,
} from '../bottomTabs/UserBottomTabsNavigator';
import { CategoryKey } from '@/constants/categoryImages';
import { userNavigations } from '@/constants/navigations';
import CartScreen from '@/screens/cart/CartScreen';
import HistoryDetailScreen from '@/screens/history/HistoryDetailScreen';
import ReviewWriteScreen from '@/screens/history/ReviewWriteScreen';
import LocationScreen from '@/screens/location/LocationScreen';
import NotificationScreen from '@/screens/notification/NotificationScreen';
import CategoryListScreen from '@/screens/store/CategoryListScreen';
import SearchResultScreen from '@/screens/store/SearchResultScreen';

export type UserStackParamList = {
  UserTabs: NavigatorScreenParams<UserBottomTabsParamList>;
  [userNavigations.STORE_HOME]: undefined;
  [userNavigations.ORDER_DETAIL]: {
    orderId: number;
    store: string;
    menu: string;
    date: string;
    onDelete: (id: number) => void; //추후 수정 예정
  };
  [userNavigations.REVIEW_WRITE]: undefined;
  [userNavigations.CATEGORY_LIST]: { key: CategoryKey; label: string };
  [userNavigations.SEARCH_RESULT]: { keyword: string };
  [userNavigations.LOCATION]: undefined;
  [userNavigations.CART]: undefined;
  [userNavigations.NOTIFICATION]: undefined;
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
        name={userNavigations.LOCATION}
        component={LocationScreen}
        options={{ title: '지역 설정' }}
      />
      <Stack.Screen
        name={userNavigations.CART}
        component={CartScreen}
        options={{ title: '장바구니' }}
      />
      <Stack.Screen
        name={userNavigations.NOTIFICATION}
        component={NotificationScreen}
        options={{ title: '알림함' }}
      />
      <Stack.Screen
        name={userNavigations.CATEGORY_LIST}
        component={CategoryListScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name={userNavigations.SEARCH_RESULT}
        component={SearchResultScreen}
        options={{ title: '검색 결과' }}
      />
    </Stack.Navigator>
  );
}

export default UserStackNavigator;
