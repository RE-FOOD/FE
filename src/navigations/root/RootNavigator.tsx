import LoggedOutStackNavigator from '../stack/LoggedOutStackNavigator';
import UserStackNavigator from '../stack/UserStackNavigator';

function RootNavigator() {
  const isAuthenticated = false;
  const isSeller = false;

  if (!isAuthenticated) {
    return <LoggedOutStackNavigator />;
  }

  if (!isSeller) {
    return <UserStackNavigator />;
  }
  return <LoggedOutStackNavigator />;
}

export default RootNavigator;
