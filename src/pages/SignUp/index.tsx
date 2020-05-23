import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Logo,
  Title,
  BackToLogonButton,
  BackToLogonButtonText,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Logo source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" placeholder="Nome" icon="user" />
            <Input name="email" placeholder="E-mail" icon="mail" />
            <Input name="password" placeholder="Senha" icon="lock" />

            <Button onPress={() => console.log('Nice!!')}>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogonButton onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToLogonButtonText>Voltar ao logon</BackToLogonButtonText>
      </BackToLogonButton>
    </>
  );
};

export default SignUp;
