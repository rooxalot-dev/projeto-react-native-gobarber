import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Routes} from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#312e38" />
        <Routes />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
