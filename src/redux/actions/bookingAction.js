import axios from 'axios';
import {
  ADD_AGENT_URL,
  ADD_BOOKING_URL,
  ALL_BOOKINGS_URL,
  BASE_URL,
  BOOKING_BY_ID_URL,
  BOOKING_HISTORY_BY_BOOKING_ID_URL,
  DELETE_BOOKING_URL,
  UPDATE_BOOKING_URL,
} from '../../api/apiConstants';
import {BOOKING_DATA, BOOKING_DATA_BY_ID, HISTORY_DATA} from './types';
import moment from 'moment';

export const fetchAllBookings = () => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + ALL_BOOKINGS_URL;
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
          let bookingData = response.data;
          bookingData.sort((a, b) => {
            return new Date(b.checkInDate) - new Date(a.checkInDate);
          });

          const currentBookingData = bookingData.filter(item => {
            const currentDate = new Date(
              moment(new Date()).format('MM-DD-YYYY 05:30'),
            );
            if (
              currentDate >=
                new Date(moment(item.checkInDate).format('MM-DD-YYYY 05:30')) &&
              currentDate <=
                new Date(moment(item.checkOutDate).format('MM-DD-YYYY 05:30'))
            ) {
              return item;
            }
          });

          const upcomingBookingData = bookingData.filter(item => {
            const currentDate = new Date(
              moment(new Date()).format('MM-DD-YYYY 05:30'),
            );
            if (currentDate < new Date(item.checkInDate)) {
              return item;
            }
          });

          const pastBookingData = bookingData.filter(item => {
            const currentDate = new Date(
              moment(new Date()).format('MM-DD-YYYY 05:30'),
            );
            if (currentDate > new Date(item.checkOutDate)) {
              return item;
            }
          });

          dispatch({
            type: BOOKING_DATA,
            bookingData,
            currentBookingData,
            upcomingBookingData,
            pastBookingData,
          });
        })
        .catch(err => {
          console.log('Error', err);
        });
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const fetchBookingById = bookingId => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + BOOKING_BY_ID_URL + `/${bookingId}`;
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
          let bookingData = response.data;
          dispatch({type: BOOKING_DATA_BY_ID, bookingData});
        })
        .catch(err => {
          console.log('Error', err);
        });
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const fetchAllHistory = bookingId => {
  return async (dispatch, getState) => {
    const API_URL =
      BASE_URL + BOOKING_HISTORY_BY_BOOKING_ID_URL + `/${bookingId}`;
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
          let historyData = response.data;
          historyData.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });
          dispatch({type: HISTORY_DATA, historyData});
        })
        .catch(err => {
          console.log('Error', err);
        });
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const addBooking = bookingData => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    checkInDate,
    checkOutDate,
    specialInstructions,
    numberAdults,
    numberKids,
    totalAmount,
    deposit,
    agentEmail,
    agentType,
    agentName,
  } = bookingData;

  return async (dispatch, getState) => {
    const API_URL = BASE_URL + ADD_BOOKING_URL;
    console.log('API URL', API_URL);
    try {
      const token = getState().user.token;
      axios
        .post(
          API_URL,
          {
            bookingData,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then(async response => {
          console.log('Booking Action Add Response: ', response.data);
          alert('Booking added successfully!');
        })
        .catch(error => {
          console.log('Booking already exists', error);
          alert('Booking already exists!');
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const deleteBooking = bookingId => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + DELETE_BOOKING_URL + `/${bookingId}`;
    console.log('API URL', API_URL);
    try {
      const token = getState().user.token;
      axios
        .patch(
          API_URL,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then(response => {
          console.log('Response', response);
          alert('Booking deleted successfully!');
        })
        .catch(err => {
          console.log('Error', err);
          alert('Booking not deleted!');
        });
    } catch (err) {
      console.log('Error', err);
    }
  };
};

export const updateBooking = bookingData => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    checkInDate,
    checkOutDate,
    specialInstructions,
    numberAdults,
    numberKids,
    totalAmount,
    deposit,
    agentEmail,
    agentType,
    agentName,
  } = bookingData;

  return async (dispatch, getState) => {
    const API_URL = BASE_URL + UPDATE_BOOKING_URL + `/${bookingData.id}`;
    console.log('API URL', API_URL);
    try {
      const token = getState().user.token;
      axios
        .patch(
          API_URL,
          {
            bookingData,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then(async response => {
          console.log('Booking Action Update Response: ', response.data);
          alert('Booking updated successfully!');
        })
        .catch(error => {
          console.log('Booking already exists', error);
          alert('Booking already exists!');
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };
};
