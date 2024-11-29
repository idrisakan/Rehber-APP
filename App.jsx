import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/router/rootNavigator';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import { Provider } from 'react-redux';
import store from './src/store';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs = false; 

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApplicationProvider>
    </Provider>
  );
}
