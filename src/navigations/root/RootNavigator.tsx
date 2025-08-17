import LoggedOutStackNavigator from '../stack/LoggedOutStackNavigator';
import UserStackNavigator from '../stack/UserStackNavigator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const { isLogin } = useAuth();
  const isSeller = false;

  if (!isLogin) {
    return <LoggedOutStackNavigator />;
  }

  if (!isSeller) {
    return <UserStackNavigator />;
  }
  return <LoggedOutStackNavigator />;
}

export default RootNavigator;
