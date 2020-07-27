import React, { useCallback, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker, {
  AndroidEvent,
} from '@react-native-community/datetimepicker';

import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const toggleCalendar = useCallback(() => {
    setShowCalendar(state => !state);
  }, []);

  const handleDateChanged = useCallback(
    (e: AndroidEvent, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowCalendar(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

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

      <SC.CalendarContainer>
        <SC.CalendarTitle>Choose a date</SC.CalendarTitle>

        <SC.OpenCalendarButton>
          <SC.OpenCalendarButtonText onPress={toggleCalendar}>
            Open Calendar
          </SC.OpenCalendarButtonText>
        </SC.OpenCalendarButton>

        {showCalendar && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={selectedDate}
            textColor="#f4ede8"
            onChange={handleDateChanged}
          />
        )}
      </SC.CalendarContainer>
    </SC.Container>
  );
};

export default CreateAppointment;
