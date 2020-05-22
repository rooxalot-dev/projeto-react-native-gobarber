import React from 'react';

import {Container, Logo} from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Logo source={logoImg} />
    </Container>
  );
};

export default SignUp;
