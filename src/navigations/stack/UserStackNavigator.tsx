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
import LocationPostcodeScreen from '@/screens/location/LocationPostcodeScreen';
import LocationScreen from '@/screens/location/LocationScreen';
import GreenReport from '@/screens/mypage/GreenReportScreen';
import NicknameChangeScreen from '@/screens/mypage/NicknameChangeScreen';
import Private from '@/screens/mypage/PrivateScreen';
import Review from '@/screens/mypage/ReviewScreen';
import Rule from '@/screens/mypage/RuleScreen';
import NotificationScreen from '@/screens/notification/NotificationScreen';
import CategoryListScreen from '@/screens/store/CategoryListScreen';
import SearchResultScreen from '@/screens/store/SearchResultScreen';
import StoreDetailScreen from '@/screens/store/StoreDetailScreen';
import StoreHomeScreen from '@/screens/store/StoreHomeScreen';
import StoreInfoScreen from '@/screens/store/StoreInfoScreen';
import StoreReviewScreen from '@/screens/store/StoreReviewScreen';

export type UserStackParamList = {
  UserTabs: NavigatorScreenParams<UserBottomTabsParamList>;
  [userNavigations.STORE_HOME]: undefined;
  [userNavigations.STORE_DETAIL]: { storeId: number; storeName: string };
  [userNavigations.STORE_REVIEW]: { storeId: number };
  [userNavigations.STORE_INFO]: { storeId: number; storeName: string };
  [userNavigations.ORDER_DETAIL]: {
    orderId: number;
  };
  [userNavigations.REVIEW_WRITE]: undefined;
  [userNavigations.NiCKNAME_CHANGE]: undefined;
  [userNavigations.CATEGORY_LIST]: { key: CategoryKey; label: string };
  [userNavigations.SEARCH_RESULT]: { keyword: string };
  [userNavigations.LOCATION]: undefined;
  [userNavigations.LOCATION_POSTCODE]: undefined;
  [userNavigations.CART]: undefined;
  [userNavigations.NOTIFICATION]: undefined;
  [userNavigations.REVIEW]: undefined;
  [userNavigations.REPORT]: undefined;
  [userNavigations.PRIVATE]: undefined;
  [userNavigations.RULE]: undefined;
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
      <Stack.Screen name="StoreHome" component={StoreHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{ title: '', headerShown: true }}
      />
      <Stack.Screen
        name="StoreInfo"
        component={StoreInfoScreen}
        options={{ title: '', headerShown: true }}
      />
      <Stack.Screen
        name="StoreReview"
        component={StoreReviewScreen}
        options={{ title: '리뷰', headerShown: true }}
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
        name={userNavigations.LOCATION}
        component={LocationScreen}
        options={{ title: '지역 설정' }}
      />
      <Stack.Screen
        name={userNavigations.LOCATION_POSTCODE}
        component={LocationPostcodeScreen}
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
      <Stack.Screen
        name={userNavigations.REVIEW}
        component={Review}
        options={{ title: '리뷰 관리' }}
      />
      <Stack.Screen
        name={userNavigations.REPORT}
        component={GreenReport}
        options={{ title: '환경 리포트' }}
      />
      <Stack.Screen
        name={userNavigations.PRIVATE}
        component={Private}
        options={{ title: '개인정보 처리방침' }}
      />
      <Stack.Screen name={userNavigations.RULE} component={Rule} options={{ title: '운영 약관' }} />
    </Stack.Navigator>
  );
}

export default UserStackNavigator;
