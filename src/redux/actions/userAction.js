import React from 'react';
import {SET_LOGOUT, SET_LOGIN} from './types';
import {
  ADD_AGENT_URL,
  BASE_URL,
  USER_DELETE_URL,
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_SIGNUP_URL,
} from '../../api/apiConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const login = (email, password) => {
  return async dispatch => {
    const API_URL = BASE_URL + USER_LOGIN_URL;
    console.log('API URL', API_URL);
    try {
      axios
        .post(
          API_URL,
          {
            email,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async response => {
          console.log('User Action Login Response: ', response.data);
          if (!response) {
            const resData = await response;
            let message = 'Something went wrong!';
            console.log('ResData', resData);
            throw new Error(message);
          }

          const resData = await response;
          saveDataToStorage(resData.data.token, resData.data.user);
          dispatch({
            type: SET_LOGIN,
            token: resData.data.token,
            user: resData.data.user,
          });
        })
        .catch(error => {
          console.log('User not found', error);
          alert('Invalid credentials. Please try again');
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const signup = (name, email, password) => {
  return async dispatch => {
    const API_URL = BASE_URL + USER_SIGNUP_URL;
    console.log('API URL', API_URL);
    try {
      axios
        .post(
          API_URL,
          {
            name,
            email,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async response => {
          console.log('User Action Signup Response: ', response.data);
          if (!response) {
            const resData = await response;
            let message = 'Something went wrong!';
            console.log('ResData', resData);
            throw new Error(message);
          }

          const resData = await response;
          saveDataToStorage(resData.data.token, resData.data.user);
          dispatch({
            type: SET_LOGIN,
            token: resData.data.token,
            user: resData.data.user,
          });
        })
        .catch(error => {
          console.log('User already exists', error);
          alert('User already exists!');
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + USER_LOGOUT_URL;
    console.log('API URL', API_URL);
    try {
      const token = getState().user.token;
      await axios.post(
        API_URL,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      AsyncStorage.removeItem('user');
      dispatch({type: SET_LOGOUT});
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const deleteProfile = () => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + USER_DELETE_URL;
    console.log('API URL', API_URL);
    try {
      const token = getState().user.token;
      await axios.post(
        API_URL,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      AsyncStorage.removeItem('user');
      dispatch({type: SET_LOGOUT});
    } catch (err) {
      console.log('Error', err);
    }
  };
};

const saveDataToStorage = (token, user) => {
  AsyncStorage.setItem(
    'user',
    JSON.stringify({
      token,
      user,
    }),
  );
};
