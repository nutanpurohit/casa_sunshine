import axios from 'axios';
import {BASE_URL, USER_LOGIN} from './apiConstants';

export const userLogin = async data => {
  const API_URL = BASE_URL + USER_LOGIN;
  axios
    .post(API_URL, {
      data,
    })
    .then(response => {
      console.log('Login response: ', response);
    })
    .catch(error => {
      console.log('Login error: ', error);
    });
};
