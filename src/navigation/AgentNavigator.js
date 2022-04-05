import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Agents from '../screens/Agents';
import AddAgent from '../screens/Agents/AddAgent';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const AgentNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.PRIMARY,
      }}>
      <Stack.Screen
        name="AgentsScreen"
        component={Agents}
        options={{
          headerTitle: 'Agents',
        }}
      />
      <Stack.Screen
        name="AddAgentScreen"
        component={AddAgent}
        options={{
          headerTitle: 'Add Agent',
        }}
      />
    </Stack.Navigator>
  );
};

export default AgentNavigator;
