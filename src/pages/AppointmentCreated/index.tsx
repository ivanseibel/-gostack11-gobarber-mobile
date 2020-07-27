import React, { useCallback } from 'react';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import * as SC from './styles';

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  return (
    <SC.Container>
      <Icon name="check" size={80} color="#04d361" />

      <SC.Title>Appointment scheduled</SC.Title>
      <SC.Description>
        Tuesday, March 14, 2020, at 12 pm, with Ivan Seibel.
      </SC.Description>

      <SC.OkButton onPress={handleOkPressed}>
        <SC.OkButtonText>Ok</SC.OkButtonText>
      </SC.OkButton>
    </SC.Container>
  );
};

export default AppointmentCreated;
