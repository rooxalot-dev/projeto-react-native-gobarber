import styled from 'styled-components/native';
import {TouchableOpacity, StyleSheet} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 30px;
`;

export const Logo = styled.Image.attrs({resizeMode: 'contain'})`
  width: 60%;
`;

export const Title = styled.Text`
  margin: 40px 0 24px;
  font-family: 'RobotoSlab-Medium';
  font-size: 28px;
  color: #f4ede8;
`;

export const ForgotPassword = styled(TouchableOpacity)`
  margin-top: 20px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #f4ede8;
`;

export const CreateAccountButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #312e38;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: #232129;
`;

export const CreateAccountButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #ff9000;
  margin-left: 10px;
`;
