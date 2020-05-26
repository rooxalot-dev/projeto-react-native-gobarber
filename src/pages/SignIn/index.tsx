import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';

import {useAuth} from '../../hooks/Auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Logo,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

interface SignFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {signIn, user} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  console.log('User', user);

  const handleSubmit = useCallback(
    async (data: SignFormData) => {
      formRef.current && formRef.current.setErrors({});
      setLoading(true);

      const schema = Yup.object().shape({
        email: Yup.string().email().required('E-mail é obrigatório!'),
        password: Yup.string().required('Senha é obrigatória!'),
      });

      try {
        const validData = await schema.validate(data, {abortEarly: false});
        await signIn(data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          if (formRef && formRef.current) {
            formRef.current.setErrors(errors);
            return;
          }
        }

        Alert.alert(
          'Ocorreu um erro!',
          'Não foi possível realizar a autenticação. Verifique suas credênciais e tente novamente!',
          undefined,
          {cancelable: true},
        );
      } finally {
        setLoading(false);
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Logo source={logoImg} />
            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="email"
                placeholder="E-mail"
                icon="mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Input
                name="password"
                placeholder="Senha"
                icon="lock"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current && formRef.current.submitForm();
                }}
              />

              <Button
                onPress={() => formRef.current && formRef.current.submitForm()}
              >
                {!loading ? 'Entrar' : <ActivityIndicator color="#312e38" />}
              </Button>
            </Form>

            <ForgotPassword onPress={() => console.log('ForgotPassword!!')}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
