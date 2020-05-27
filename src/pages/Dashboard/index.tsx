import React from 'react';
import {View} from 'react-native';

import {useAuth} from '../../hooks/Auth';

import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const {signOut} = useAuth();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button style={{maxWidth: '50%'}} onPress={() => signOut()}>
        Sair
      </Button>
    </View>
  );
};

export default Dashboard;
