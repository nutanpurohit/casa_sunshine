import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Transactions from '../screens/Transactions';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const TransactionsNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.PRIMARY,
      }}>
      <Stack.Screen
        name="TransactionsScreen"
        component={Transactions}
        options={{
          headerTitle: 'Transactions',
        }}
      />
    </Stack.Navigator>
  );
};

export default TransactionsNavigator;
