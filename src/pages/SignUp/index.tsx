import React, { useRef, useCallback } from 'react';
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

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback((data: unknown) => {
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
              <SC.Title>Create your account</SC.Title>
            </View>

            <Form onSubmit={handleSignUp} ref={formRef}>
              <Input name="name" icon="user" placeholder="Name" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Password" />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Create
              </Button>
            </Form>
          </SC.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <SC.BackToSignInButton
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <SC.BackToSignInButtonText>Go back to logon</SC.BackToSignInButtonText>
      </SC.BackToSignInButton>
    </>
  );
};

export default SignUp;
