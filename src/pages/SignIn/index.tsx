import React from 'react';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Logo, Title} from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Logo source={logoImg} />
      <Title>Faça seu logon</Title>

      <Input name="email" placeholder="E-mail" icon="mail" />
      <Input name="password" placeholder="Senha" icon="lock" />

      <Button onPress={() => console.log('Nice!!')}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
