import React from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {useSelector} from 'react-redux';

const MainNavigator = () => {
  const isLogin = useSelector(state => state.user?.isLogin);
  // const isLogin = true;
  console.log('Login', isLogin);
  return isLogin ? <AppNavigator /> : <AuthNavigator />;
};

export default MainNavigator;
