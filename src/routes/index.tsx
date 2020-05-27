import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {useAuth} from '../hooks/Auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const AuthNavigator = createStackNavigator();

const Routes: React.FC = () => {
  const {user, loadingUserData} = useAuth();

  if (loadingUserData) {
    return (
      <View
        style={{
          backgroundColor: '#312e38',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export {Routes};
