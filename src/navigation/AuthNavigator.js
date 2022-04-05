import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

const AuthNavigator = props => {
  return (
    <Stack.Navigator initialRouteName={Login}>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
