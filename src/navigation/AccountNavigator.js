import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/Account';
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
    </Stack.Navigator>
  );
};

export default AccountNavigator;
