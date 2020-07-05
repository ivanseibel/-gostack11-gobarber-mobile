import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import * as SC from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: unknown) => {
    console.log(data);
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

            <Form onSubmit={handleSignIn} ref={formRef}>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Password" />
              <Button onPress={() => formRef.current?.submitForm()}>
                Logon
              </Button>
            </Form>

            <SC.ForgotPassword
              onPress={() => {
                console.log('Hello Wordl');
              }}
            >
              <SC.ForgotPasswordText>
                I forgot my password
              </SC.ForgotPasswordText>
            </SC.ForgotPassword>
          </SC.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <SC.CreateAccountButton
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <SC.CreateAccountButtonText>
          Create new account
        </SC.CreateAccountButtonText>
      </SC.CreateAccountButton>
    </>
  );
};

export default SignIn;
