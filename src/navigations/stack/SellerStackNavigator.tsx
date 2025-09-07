import { ImageSourcePropType } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SellerBottomTabsNavigator, {
  SellerBottomTabsParamList,
} from '../bottomTabs/SellerBottomTabsNavigator';
import { BackButton } from '@/components/_common/BackButton';
import { sellerNavigations } from '@/constants/navigations';
import SellerMenuModifyScreen from '@/screens/seller/SellerMenuModifyScreen';
import SellerMenuRegisterScreen from '@/screens/seller/SellerMenuRegisterScreen';

// 임시
export type MenuItem = {
  id: number;
  name: string;
  info: string;
  price: number;
  discountPrice: number;
  quantity: number;
  image: ImageSourcePropType;
};

export type SellerStackparamList = {
  SellerTabs: NavigatorScreenParams<SellerBottomTabsParamList>;
  [sellerNavigations.ORDER_HOME]: undefined;
  [sellerNavigations.MYPAGE_HOME]: undefined;
  [sellerNavigations.MENU_REGISTER]: undefined;
  [sellerNavigations.MENU_MODIFY]: {
    menu: MenuItem;
  };
};

const Stack = createStackNavigator<SellerStackparamList>();

function SellerStackNavigator() {
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
        name="SellerTabs"
        component={SellerBottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={sellerNavigations.MENU_REGISTER}
        component={SellerMenuRegisterScreen}
        options={{ title: '메뉴 등록' }}
      />
      <Stack.Screen
        name={sellerNavigations.MENU_MODIFY}
        component={SellerMenuModifyScreen}
        options={{ title: '메뉴 수정' }}
      />
    </Stack.Navigator>
  );
}

export default SellerStackNavigator;
