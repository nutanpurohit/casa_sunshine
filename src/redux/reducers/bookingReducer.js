import {BOOKING_DATA, BOOKING_DATA_BY_ID, HISTORY_DATA} from '../actions/types';

const initialState = {
  bookingData: null,
  currentBookingData: null,
  upcomingBookingData: null,
  pastBookingData: null,
  bookingDataById: null,
  historyData: null,
};

export function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case BOOKING_DATA:
      console.log('Booking reducers: ', action);
      return {
        ...state,
        bookingData: action.bookingData,
        currentBookingData: action.currentBookingData,
        upcomingBookingData: action.upcomingBookingData,
        pastBookingData: action.pastBookingData,
      };
    case BOOKING_DATA_BY_ID:
      console.log('Booking reducers: ', action);
      return {
        ...state,
        bookingDataById: action.bookingData,
      };
    case HISTORY_DATA:
      console.log('History reducers: ', action);
      return {
        ...state,
        historyData: action.historyData,
      };
    default:
      return state;
  }
}
