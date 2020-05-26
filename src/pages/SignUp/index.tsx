import React, {useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface CreatedUuser {
  name: string;
  email: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      formRef.current && formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório!'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail é obrigatório!'),
        password: Yup.string().min(
          6,
          'Senha deve possuir pelo menos 6 caracteres!',
        ),
      });

      try {
        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        const {data: user} = await api.post<CreatedUuser>('/users', validData);

        Alert.alert(
          `Cadastro do usuário ${user.name} realizado com sucesso!`,
          'Você será redirecionado para o logon!',
          [
            {
              text: 'OK',
              style: 'default',
              onPress: () => navigation.navigate('SignIn'),
            },
          ],
          undefined,
        );
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
          'Não foi possível realizar seu cadastro. Tente novamente!',
          undefined,
          {cancelable: true},
        );
      }
    },
    [navigation],
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
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="Nome"
                icon="user"
                autoCapitalize="words"
              />
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
