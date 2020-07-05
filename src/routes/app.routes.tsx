import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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
  </Apps.Navigator>
);

export default AuthRoutes;
