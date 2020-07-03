import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import * as SC from './styles';

const SignIn: React.FC = () => {
  return (
    <SC.Container>
      <Image source={logoImg} />
    </SC.Container>
  );
};

export default SignIn;
