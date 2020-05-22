import React from 'react';
import {TextInputProperties} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Container, TextInput} from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...inputProps}) => {
  return (
    <Container>
      {icon && <Icon name={icon} size={24} color="#666360"  style={{ marginRight: 10 }}/>}
      <TextInput
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        {...inputProps}
      />
    </Container>
  );
};

export default Input;
