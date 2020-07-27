import React, { useCallback, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useRoute, useNavigation } from '@react-navigation/native';
import * as SC from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface IRouteParams {
  providerId: string;
}

export interface IProvider {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as IRouteParams;
  const { user } = useAuth();
  const navigation = useNavigation();
  const [providers, setProviders] = useState<IProvider[]>();
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback(providerId => {
    setSelectedProvider(providerId);
  }, []);

  return (
    <SC.Container>
      <SC.Header>
        <SC.BackButton onPress={navigateBack}>
          <Icon name="chevron-left" color="#999591" size={24} />
        </SC.BackButton>

        <SC.HeaderTitle>Barbers</SC.HeaderTitle>

        <SC.UserAvatar source={{ uri: user.avatar_url }} />
      </SC.Header>

      <SC.ProvidersListContainer>
        <SC.ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <SC.ProviderContainer
              onPress={() => {
                handleSelectProvider(provider.id);
              }}
              selected={provider.id === selectedProvider}
            >
              <SC.ProviderAvatar source={{ uri: provider.avatar_url }} />
              <SC.ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </SC.ProviderName>
            </SC.ProviderContainer>
          )}
        />
      </SC.ProvidersListContainer>
    </SC.Container>
  );
};

export default CreateAppointment;
