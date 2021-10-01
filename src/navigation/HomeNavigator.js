import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import colors from '../constants/colors';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const Stack = createStackNavigator();

const HomeNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.PRIMARY,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerTitle: 'Home',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
