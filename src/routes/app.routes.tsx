import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

const Apps = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Apps.Navigator
    screenOptions={{
      // headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Apps.Screen name="Dashboard" component={Dashboard} />
    <Apps.Screen name="CreateAppointment" component={CreateAppointment} />
    <Apps.Screen name="AppointmentCreated" component={AppointmentCreated} />

    <Apps.Screen name="Profile" component={Profile} />
  </Apps.Navigator>
);

export default AuthRoutes;
