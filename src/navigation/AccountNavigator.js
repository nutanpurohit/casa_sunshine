import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/Account';
import Home from '../screens/Home';
import Bookings from '../screens/Bookings';
import Transactions from '../screens/Transactions';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const AccountNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.PRIMARY,
      }}>
      <Stack.Screen
        name="AccountScreen"
        component={Account}
        options={{
          headerTitle: 'Account',
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerTitle: 'Home',
        }}
      />
      <Stack.Screen
        name="BookingsScreen"
        component={Bookings}
        options={{
          headerTitle: 'Bookings',
        }}
      />
      <Stack.Screen
        name="TransactionScreen"
        component={Transactions}
        options={{
          headerTitle: 'Transactions',
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
