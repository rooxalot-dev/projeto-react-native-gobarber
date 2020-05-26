import styled, {css} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  hasFocus: boolean;
  hasError: boolean;
}

interface InputIconProps {
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 54px;
  padding: 0 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #232129;
  border-width: 2px;
  border-color: #232129;

  ${(props) =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.hasFocus &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #fff;
`;

export const InputIcon = styled(Icon)<InputIconProps>`
  margin-right: 10px;
  color: #666360;

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
`;
