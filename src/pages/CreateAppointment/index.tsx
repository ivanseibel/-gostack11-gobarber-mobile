import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useRoute, useNavigation } from '@react-navigation/native';
import * as SC from './styles';
import { useAuth } from '../../hooks/auth';

interface IRouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { providerId } = route.params as IRouteParams;
  const { user } = useAuth();
  const navigation = useNavigation();

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SC.Container>
      <SC.Header>
        <SC.BackButton onPress={navigateBack}>
          <Icon name="chevron-left" color="#999591" size={24} />
        </SC.BackButton>
        <SC.HeaderTitle>Barbers</SC.HeaderTitle>
        <SC.UserAvatar source={{ uri: user.avatar_url }} />
      </SC.Header>
    </SC.Container>
  );
};

export default CreateAppointment;
