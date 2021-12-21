import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import MainNavigation from './src/navigations/Main.navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
export default function App() {
  const queryClient = new QueryClient();

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainNavigation />
          <Toast />
        </NavigationContainer>
      </QueryClientProvider>
    </ApplicationProvider>
  );
}
