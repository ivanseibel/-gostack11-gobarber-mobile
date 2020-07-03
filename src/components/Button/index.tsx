import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import * as SC from './styles';

interface RectButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<RectButtonProps> = ({ children, ...rest }) => {
  return (
    <SC.Container {...rest}>
      <SC.ButtonText>{children}</SC.ButtonText>
    </SC.Container>
  );
};

export default Button;
