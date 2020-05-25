import React, {useRef, useCallback} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';

import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Logo,
  Title,
  BackToLogonButton,
  BackToLogonButtonText,
} from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSubmit = useCallback((data: any) => {
    console.log('Form Data: ', data);
  }, []);

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

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="name" placeholder="Nome" icon="user" />
              <Input name="email" placeholder="E-mail" icon="mail" />
              <Input
                name="password"
                placeholder="Senha"
                secureTextEntry
                icon="lock"
              />

              <Button
                onPress={() => formRef.current && formRef.current.submitForm()}
              >
                Cadastrar
              </Button>
            </Form>
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
