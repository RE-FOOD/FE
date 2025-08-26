import LoggedOutStackNavigator from '../stack/LoggedOutStackNavigator';
import UserStackNavigator from '../stack/UserStackNavigator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const { isLogin, isSeller } = useAuth();

  if (!isLogin) {
    return <LoggedOutStackNavigator />;
  }

  if (isSeller) {
    return <LoggedOutStackNavigator />;
  }
  return <UserStackNavigator />;
}

export default RootNavigator;
