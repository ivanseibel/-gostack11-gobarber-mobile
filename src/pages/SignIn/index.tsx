import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import * as SC from './styles';

const SignIn: React.FC = () => {
  return (
    <SC.Container>
      <Image source={logoImg} />

      <SC.Title>Log on to the app</SC.Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Password" />
      <Button
        onPress={() => {
          console.log('Hello World');
        }}
      >
        Logon
      </Button>
    </SC.Container>
  );
};

export default SignIn;
