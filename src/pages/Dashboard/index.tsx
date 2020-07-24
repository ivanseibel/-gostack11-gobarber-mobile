import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';

import * as SC from './styles';
import api from '../../services/api';

export interface IProvider {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    signOut();
    // navigate('Profile');
  }, [signOut]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  return (
    <SC.Container>
      <SC.Header>
        <SC.HeaderTitle>
          {`Welcome,\n`}
          <SC.UserName>{user.name}</SC.UserName>
        </SC.HeaderTitle>

        <SC.ProfileButton onPress={navigateToProfile}>
          <SC.UserAvatar source={{ uri: user.avatar_url }} />
        </SC.ProfileButton>
      </SC.Header>

      <SC.ProvidersList
        data={providers}
        ListHeaderComponent={
          <SC.ProvidersListTitle>Barbers</SC.ProvidersListTitle>
        }
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider }) => (
          <SC.ProviderContainer
            onPress={() => {
              navigateToCreateAppointment(provider.id);
            }}
          >
            <SC.ProviderAvatar source={{ uri: provider.avatar_url }} />

            <SC.ProviderInfo>
              <SC.ProviderName>{provider.name}</SC.ProviderName>
              <SC.ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <SC.ProviderMetaText>Monday to Friday</SC.ProviderMetaText>
              </SC.ProviderMeta>

              <SC.ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <SC.ProviderMetaText>8am to 6pm</SC.ProviderMetaText>
              </SC.ProviderMeta>
            </SC.ProviderInfo>
          </SC.ProviderContainer>
        )}
      />
    </SC.Container>
  );
};

export default Dashboard;
