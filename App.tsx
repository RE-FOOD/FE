import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@/navigations/root/RootNavigator';

const AppTheme = {
  ...DefaultTheme,
};

function AppContent() {
  return (
    <NavigationContainer theme={AppTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
function App() {
  return <AppContent />;
}
export default App;
