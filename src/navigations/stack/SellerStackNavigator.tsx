import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SellerBottomTabsNavigator, {
  SellerBottomTabsParamList,
} from '../bottomTabs/SellerBottomTabsNavigator';
import { sellerNavigations } from '@/constants/navigations';

export type SellerStackparamList = {
  SellerTabs: NavigatorScreenParams<SellerBottomTabsParamList>;
  [sellerNavigations.MENU_HOME]: undefined;
  [sellerNavigations.ORDER_HOME]: undefined;
  [sellerNavigations.MYPAGE_HOME]: undefined;
};

const Stack = createStackNavigator<SellerStackparamList>();

function SellerStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="SellerTabs"
        component={SellerBottomTabsNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SellerStackNavigator;
