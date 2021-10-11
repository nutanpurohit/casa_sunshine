import {AGENT_DATA, ALL_AGENT_DATA} from '../actions/types';

const initialState = {
  agentData: null,
  allAgentData: null,
};

export function agentReducer(state = initialState, action) {
  switch (action.type) {
    case AGENT_DATA:
      console.log('Agent reducers: ', action);
      return {
        ...state,
        agentData: action.agentData,
      };
    case ALL_AGENT_DATA:
      console.log('Agent reducers: ', action);
      return {
        ...state,
        allAgentData: action.agentData,
      };
    default:
      return state;
  }
}
