import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import MainNavigation from './src/navigations/Main.navigation';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </ApplicationProvider>
  );
}
