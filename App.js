import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import StoreConfig from './src/redux/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={StoreConfig().store}>
      <PersistGate loading={null} persistor={StoreConfig().persistor}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
