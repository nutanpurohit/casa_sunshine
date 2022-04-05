import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {bookingReducer} from './bookingReducer';
import {agentReducer} from './agentReducer';
import {transactionReducer} from './transactionReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  booking: bookingReducer,
  agent: agentReducer,
  transaction: transactionReducer,
});
