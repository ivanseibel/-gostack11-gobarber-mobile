import React, { useRef, useCallback, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import * as SC from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const { user, updateUser } = useAuth();

  const handleProfile = useCallback(
    async (data: ProfileFormData): Promise<void> => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('Email is required')
            .email('Must be a valid email'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: true,
            then: Yup.string()
              .min(6, 'Min 6 characters')
              .required('Password is required'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmation must match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const validatedData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : null),
        };

        await api.put('profile', validatedData).then(response => {
          updateUser(response.data);
        });

        navigation.goBack();

        Alert.alert('Well done', 'Your data was updated');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Oh-oh... there is something wrong',
          'Please, verify your data and try again',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    formRef.current?.setData({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker({ title: 'Select Avatar' }, response => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert(
          'Oh-oh... there is something wrong',
          `Error: ${response.error}`,
        );
      }
      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri,
      });

      api
        .patch('/users/avatar', data)
        .then(res => {
          updateUser(res.data);
          Alert.alert('Avatar update', 'Your avatar was updated');
        })
        .catch(() => {
          Alert.alert(
            'Oh-oh... there is something wrong',
            'Please, select an image or take a photo and try again',
          );
        });
    });
  }, [updateUser, user.id]);

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
            <SC.BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </SC.BackButton>

            <View style={{ alignSelf: 'center' }}>
              <SC.UserAvatarButton onPress={handleUpdateAvatar}>
                <SC.UserAvatar source={{ uri: user.avatar_url }} />
              </SC.UserAvatarButton>
            </View>

            <View>
              <SC.Title>Profile</SC.Title>
            </View>

            <Form onSubmit={handleProfile} ref={formRef}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="old_password"
                icon="lock"
                placeholder="Old password"
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="New password"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordConfirmationInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password_confirmation"
                icon="lock"
                placeholder="New password confirmation"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Update
              </Button>
            </Form>
          </SC.Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
