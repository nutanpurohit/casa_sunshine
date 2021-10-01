import {AGENT_DATA} from '../actions/types';

const initialState = {
  agentData: null,
};

export function agentReducer(state = initialState, action) {
  switch (action.type) {
    case AGENT_DATA:
      console.log('Agent reducers: ', action);
      return {
        ...state,
        agentData: action.agentData,
      };
    default:
      return state;
  }
}
