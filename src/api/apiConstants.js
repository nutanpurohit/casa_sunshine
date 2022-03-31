import {WEATHER_MAP_API_KEY} from '@env';

export const BASE_URL = 'http:127.0.0.1:3000/';
// export const BASE_URL = 'https://192.168.200.51:3000/';
// export const BASE_URL = 'http://10.0.2.2:3000/';
export const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=15.589775&lon=73.771049&appid=${WEATHER_MAP_API_KEY}&units=metric`;

// USER
export const USER_SIGNUP_URL = 'users/signup';
export const USER_LOGIN_URL = 'users/login';
export const USER_PROFILE_URL = 'users/profile';
export const USER_DELETE_URL = 'users/delete';
export const USER_UPDATE_URL = 'users/update';
export const USER_LOGOUT_URL = 'users/logout';
export const USER_CHANGE_PASSWORD_URL = 'users/changePassword';
export const USER_UPDATE_PASSWORD_URL = 'users/updatePassword';

// AGENT
export const ADD_AGENT_URL = 'agents/add';
export const ALL_AGENT_URL = 'agents/all';
export const AGENT_BY_ID_URL = 'agents/agentById';
export const AGENT_BY_EMAIL_URL = 'agents/agentByEmail';
export const AGENT_BY_TYPE_URL = 'agents/agentByType';
export const AGENT_BY_CITY_URL = 'agents/agentByCity';
export const AGENT_BY_EMAIL_NAME_TYPE_URL = 'agents/agentByEmailNameType';
export const UPDATE_AGENT_URL = 'agents/update';
export const DELETE_AGENT_URL = 'agents/delete';

// BOOKINGS
export const ADD_BOOKING_URL = 'bookings/add';
export const ALL_BOOKINGS_URL = 'bookings/all';
export const UPDATE_BOOKING_URL = 'bookings/update';
export const DELETE_BOOKING_URL = 'bookings/delete';
export const BOOKING_BY_ID_URL = 'bookings/bookingById';
export const BOOKING_BY_AGENT_ID_URL = 'bookings/bookingByAgentId';
export const GENERATE_BOOKING_REPORT_URL = 'bookings/generateBookingPDF';

// BOOKING HISTORY
export const BOOKING_HISTORY_BY_ID = 'bookings/history/bookingHistoryById';
export const BOOKING_HISTORY_BY_BOOKING_ID_URL =
  'bookings/history/bookingHistoryByBookingId';
export const DELETE_BOOKING_HISTORY_URL =
  'bookings/history/bookingHistoryDelete';

// TRANSACTIONS
export const ADD_TRANSACTION_URL = 'transactions/add';
export const ALL_TRANSACTION_URL = 'transactions/all';
export const TRANSACTION_BY_ID_URL = 'transactions/transactionById';
export const TRANSACTION_BY_BOOKING_ID_URL =
  'transactions/transactionByBookingId';

// OTHERS
export const COVID_SAFETY =
  'https://casasunshinegoa.com/covid-19-guidelines-for-casa-sunshine-goa-villa/';
export const MAKE_RESERVATION = 'reservation@casasunshinegoa.com';
export const ABOUT_US = 'https://casasunshinegoa.com/about-us/';
export const FACEBOOK_FOLLOW = 'https://www.facebook.com/casasunshinegoa/';
export const INSTAGRAM_FOLLOW = 'https://www.instagram.com/casasunshinegoa/';
export const AIRBNB_FOLLOW = 'https://airbnb.com/h/casa-sunshine-goa';
