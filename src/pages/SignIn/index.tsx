import React, { useState, useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  View,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import * as SC from './styles';

const SignIn: React.FC = () => {
  const [keyboarOpen, setKeyBoardOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyBoardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyBoardOpen(false));

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setKeyBoardOpen(true));
      Keyboard.removeListener('keyboardDidHide', () => setKeyBoardOpen(false));
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <SC.Container>
            <Image source={logoImg} />

            <View>
              <SC.Title>Log on to the app</SC.Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Password" />
            <Button
              onPress={() => {
                console.log('Hello World');
              }}
            >
              Logon
            </Button>

            <SC.ForgotPassword onPress={() => {}}>
              <SC.ForgotPasswordText>
                I forgot my password
              </SC.ForgotPasswordText>
            </SC.ForgotPassword>
          </SC.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {!keyboarOpen && (
        <SC.CreateAccountButton onPress={() => {}}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <SC.CreateAccountButtonText>
            Create new account
          </SC.CreateAccountButtonText>
        </SC.CreateAccountButton>
      )}
    </>
  );
};

export default SignIn;
