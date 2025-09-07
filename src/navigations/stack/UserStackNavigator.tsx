import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserBottomTabsNavigator, {
  UserBottomTabsParamList,
} from '../bottomTabs/UserBottomTabsNavigator';
import { BackButton } from '@/components/_common/BackButton';
import { CategoryKey } from '@/constants/categoryImages';
import { userNavigations } from '@/constants/navigations';
import EmptyStateScreen from '@/screens/_common/EmptyStateScreen';
import CartScreen from '@/screens/cart/CartScreen';
import HistoryDetailScreen from '@/screens/history/HistoryDetailScreen';
import ReviewWriteScreen from '@/screens/history/ReviewWriteScreen';
import LocationPostcodeScreen from '@/screens/location/LocationPostcodeScreen';
import LocationScreen from '@/screens/location/LocationScreen';
import NearStoreListScreen from '@/screens/map/NearStoreListScreen';
import GreenReport from '@/screens/mypage/GreenReportScreen';
import NicknameChangeScreen from '@/screens/mypage/NicknameChangeScreen';
import Private from '@/screens/mypage/PrivateScreen';
import Review from '@/screens/mypage/ReviewScreen';
import Rule from '@/screens/mypage/RuleScreen';
import NotificationScreen from '@/screens/notification/NotificationScreen';
import CouponBoxScreen from '@/screens/order/CouponBoxScreen';
import OrderScreen from '@/screens/order/OrderScreen';
import OrderSuccessScreen from '@/screens/order/OrderSuccessScreen';
import TossPaymentScreen from '@/screens/order/TossPaymentScreen';
import CategoryListScreen from '@/screens/store/CategoryListScreen';
import MenuDetailScreen from '@/screens/store/MenuDetailScreen';
import SearchResultScreen from '@/screens/store/SearchResultScreen';
import StoreDetailScreen from '@/screens/store/StoreDetailScreen';
import StoreInfoScreen from '@/screens/store/StoreInfoScreen';
import StoreReviewScreen from '@/screens/store/StoreReviewScreen';
import { Order } from '@/types/domain';

export type UserStackParamList = {
  UserTabs: NavigatorScreenParams<UserBottomTabsParamList>;
  [userNavigations.STORE_DETAIL]: { storeId: number; storeName: string };
  [userNavigations.STORE_REVIEW]: { storeId: number };
  [userNavigations.STORE_INFO]: { storeId: number; storeName: string };
  [userNavigations.MENU_DETAIL]: { storeId: number; storeName: string; menuId: number };
  [userNavigations.ORDER]: { order: Order };
  [userNavigations.COUPON_BOX]: undefined;
  [userNavigations.TOSS_PAYMENT]: { sessionId: string; totalAmount: number };
  [userNavigations.ORDER_SUCCESS]: { level: string | undefined; levelCheck: boolean | undefined };
  [userNavigations.ORDER_DETAIL]: {
    orderId: number;
  };
  [userNavigations.REVIEW_WRITE]: { storeId: number; orderId: number };
  [userNavigations.NiCKNAME_CHANGE]: undefined;
  [userNavigations.CATEGORY_LIST]: { key: CategoryKey; label: string };
  [userNavigations.SEARCH_RESULT]: { keyword: string };
  [userNavigations.LOCATION]: undefined;
  [userNavigations.LOCATION_POSTCODE]: undefined;
  [userNavigations.CART]: undefined;
  [userNavigations.NOTIFICATION]: undefined;
  [userNavigations.REVIEW]: undefined;
  [userNavigations.REPORT]: { progress: number };
  [userNavigations.PRIVATE]: undefined;
  [userNavigations.RULE]: undefined;
  [userNavigations.STORE_LIST]: { latitude: number; longitude: number };
  [userNavigations.EMPTY_STATE]: {
    icon: ImageSourcePropType;
    headerTitle: string;
    title: string;
    subtitle?: string;
  };
};

const Stack = createStackNavigator<UserStackParamList>();

function UserStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Pretendard-Medium',
          fontSize: 17,
        },
        headerLeft: BackButton,
      }}
    >
      <Stack.Screen
        name="UserTabs"
        component={UserBottomTabsNavigator}
        options={{ headerShown: false }}
      />
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
        name="MenuDetail"
        component={MenuDetailScreen}
        options={{ title: '', headerShown: true }}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{ title: '픽업 주문', headerShown: true }}
      />
      <Stack.Screen
        name={userNavigations.TOSS_PAYMENT}
        component={TossPaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={userNavigations.ORDER_SUCCESS}
        component={OrderSuccessScreen}
        options={{ title: '결제 완료', headerShown: true, headerLeft: () => null }}
      />
      <Stack.Screen
        name={userNavigations.COUPON_BOX}
        component={CouponBoxScreen}
        options={{ title: '할인 쿠폰', headerShown: true }}
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
        name={userNavigations.STORE_LIST}
        component={NearStoreListScreen}
        options={{ title: '가게 목록' }}
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
      <Stack.Screen
        name={userNavigations.EMPTY_STATE}
        component={EmptyStateScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}

export default UserStackNavigator;
