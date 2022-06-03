import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Intro from '../screens/Intro';
import LookingFor from '../screens/Auth';
import PersonalDetails from '../screens/Auth/PersonalDetails';
import Gender from '../screens/Auth/Gender';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="LookingFor" component={LookingFor} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="Gender" component={Gender} />
    </Stack.Navigator>
  );
};

export default MainNav;
