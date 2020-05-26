import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {Container, ButtonText} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string | Element;
}

const Button: React.FC<ButtonProps> = ({children, ...remainingProps}) => {
  const childrenComponent = () => {
    if (typeof children === 'string') {
      return <ButtonText>{children}</ButtonText>;
    }
    return children;
  };

  return <Container {...remainingProps}>{childrenComponent()}</Container>;
};

export default Button;
