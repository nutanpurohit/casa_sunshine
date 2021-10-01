import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import HomeNavigator from './HomeNavigator';
import BookingsNavigator from './BookingsNavigator';
import TransactionsNavigator from './TransactionsNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: colors.GRAY,
        style: {
          backgroundColor: colors.WHITE_2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsNavigator}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="calendar" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="card" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
