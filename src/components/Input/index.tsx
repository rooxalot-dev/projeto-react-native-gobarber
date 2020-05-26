import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  TextInputProperties,
  TextInput as RNTextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useField} from '@unform/core';

import {Container, TextInput, InputIcon} from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...inputProps}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const {fieldName, defaultValue = '', error, registerField} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});
  const inputTextRef = useRef<RNTextInput>(null);

  const handleInputFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setHasFocus(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  const handleErrorIconPress = useCallback(() => {
    Alert.alert('Detalhes do erro', error, undefined, {cancelable: true});
  }, [error]);

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
    <Container hasFocus={hasFocus} hasError={!!error}>
      {icon && (
        <InputIcon name={icon} size={24} isFilled={isFilled || hasFocus} />
      )}
      <TextInput
        ref={inputTextRef}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(text) => {
          setIsFilled(!!text);
          inputValueRef.current.value = text;
        }}
        {...inputProps}
      />

      {!!error && (
        <Icon
          onPress={handleErrorIconPress}
          name="alert-circle"
          size={20}
          color="#c53030"
        />
      )}
    </Container>
  );
};

export default Input;
