import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/auth';

import * as SC from './styles';

interface IRouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as IRouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(routeParams.date, "EEEE', ' MMMM' 'd', 'yyyy' at 'h aa'.'");
  }, []);

  return (
    <SC.Container>
      <Icon name="check" size={80} color="#04d361" />

      <SC.Title>Appointment scheduled to</SC.Title>
      <SC.Description>{formattedDate}</SC.Description>

      <SC.OkButton onPress={handleOkPressed}>
        <SC.OkButtonText>Ok</SC.OkButtonText>
      </SC.OkButton>
    </SC.Container>
  );
};

export default AppointmentCreated;
