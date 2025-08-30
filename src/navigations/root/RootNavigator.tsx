import LoggedOutStackNavigator from '../stack/LoggedOutStackNavigator';
import SellerStackNavigator from '../stack/SellerStackNavigator';
import UserStackNavigator from '../stack/UserStackNavigator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const { isLogin, isSeller } = useAuth();
  // const isLogin = false;
  // const isSeller = false;

  if (!isLogin) {
    return <LoggedOutStackNavigator />;
  }

  if (isSeller) {
    return <SellerStackNavigator />;
  }
  return <UserStackNavigator />;
}

export default RootNavigator;
