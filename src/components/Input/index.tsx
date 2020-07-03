import React from 'react';
import { TextInputProperties } from 'react-native';

import * as SC from './styles';

interface TextInputProps extends TextInputProperties {
  name: string;
  icon: string;
}

const Input: React.FC<TextInputProps> = ({ name, icon, ...rest }) => {
  return (
    <SC.Container>
      <SC.Icon name={icon} size={20} color="#666360" />
      <SC.TextInput
        {...rest}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
      />
    </SC.Container>
  );
};

export default Input;
