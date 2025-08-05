import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from '@/navigations/root/RootNavigator';

const AppTheme = {
  ...DefaultTheme,
};

const queryClient = new QueryClient();

function AppContent() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={AppTheme}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
function App() {
  return <AppContent />;
}
export default App;
