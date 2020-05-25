import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TextInputProperties, TextInput as RNTextInput} from 'react-native';
import {useField} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import {Container, TextInput} from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...inputProps}) => {
  const {fieldName, defaultValue = '', registerField} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});
  const inputTextRef = useRef<RNTextInput>(null);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue: (currentRef, value) => {
        inputValueRef.current.value = value;
        inputTextRef.current &&
          inputTextRef.current.setNativeProps({text: value});
      },
      clearValue: () => {
        inputValueRef.current.value = '';
        inputTextRef.current && inputTextRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {icon && (
        <Icon name={icon} size={24} color="#666360" style={{marginRight: 10}} />
      )}
      <TextInput
        ref={inputTextRef}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        onChangeText={(text) => {
          inputValueRef.current.value = text;
        }}
        {...inputProps}
      />
    </Container>
  );
};

export default Input;
