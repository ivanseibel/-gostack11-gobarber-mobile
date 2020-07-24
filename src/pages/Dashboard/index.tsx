import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
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
  }, [navigate]);

  useEffect(() => {
    try {
      console.log(api.defaults.headers.authorization);

      api.get('providers').then(response => {
        console.log(response.data);
        setProviders(response.data);
      });
    } catch (err) {
      console.log(err.message);
    }
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
        keyExtractor={provider => provider.id}
        renderItem={({ item }) => <SC.UserName>{item.name}</SC.UserName>}
      />
    </SC.Container>
  );
};

export default Dashboard;
