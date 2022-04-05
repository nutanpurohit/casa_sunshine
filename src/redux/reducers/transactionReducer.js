import {ALL_TRANSACTION_DATA, TRANSACTION_DATA} from '../actions/types';

const initialState = {
  transactionData: null,
  allTransactionData: null,
};

export function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_DATA:
      console.log('Transaction reducers: ', action);
      return {
        ...state,
        transactionData: action.transactionData,
      };
    case ALL_TRANSACTION_DATA:
      console.log('All Transaction reducers: ', action);
      return {
        ...state,
        allTransactionData: action.allTransactionData,
      };
    default:
      return state;
  }
}
