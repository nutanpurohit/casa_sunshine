import axios from 'axios';
import {
  ADD_TRANSACTION_URL,
  ALL_TRANSACTION_URL,
  BASE_URL,
  TRANSACTION_BY_BOOKING_ID_URL,
} from '../../api/apiConstants';
import {ALL_TRANSACTION_DATA, TRANSACTION_DATA} from './types';

export const addTransaction = transactionData => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + ADD_TRANSACTION_URL;
    console.log('API URL', API_URL, transactionData);
    try {
      const token = getState().user.token;
      axios
        .post(
          API_URL,
            transactionData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then(async response => {
          console.log('Transaction Action Add Response: ', response.data);
          alert('Transaction added successfully!');
        })
        .catch(error => {
          console.log('Transaction already completed', error);
          console.log("token", token);
          alert('Transaction already completed!');
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const fetchAllTransaction = bookingId => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + TRANSACTION_BY_BOOKING_ID_URL + `/${bookingId}`;
    console.log('API URL', API_URL);
    try {
      const token = getState().user.token;
      axios
        .get(API_URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
        .then(response => {
          console.log('Response', response);
          const transactionData = response.data;
          transactionData.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          dispatch({type: TRANSACTION_DATA, transactionData});
        })
        .catch(err => {
          console.log('Error', err);
        });
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const allTransactions = () => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + ALL_TRANSACTION_URL;
    console.log('API URL', API_URL);
    try {
      const token = getState().user?.token;
      axios
        .get(API_URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
        .then(response => {
          console.log('Response', response);
          const allTransactionData = response?.data;
          allTransactionData.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          dispatch({type: ALL_TRANSACTION_DATA, allTransactionData});
        })
        .catch(err => {
          console.log('Error', err);
        });
    } catch (err) {
      console.log('Error', err);
    }
  };
};
