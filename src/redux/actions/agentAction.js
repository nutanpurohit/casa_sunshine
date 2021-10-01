import axios from 'axios';
import {AGENT_BY_ID_URL, BASE_URL} from '../../api/apiConstants';
import {AGENT_DATA} from './types';

export const fetchAgentById = agentId => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + AGENT_BY_ID_URL + `/${agentId}`;
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
          console.log('Res', response);
          const agentData = response.data;
          if (agentData) {
            dispatch({type: AGENT_DATA, agentData});
          } else {
            const agentData = [];
            dispatch({type: AGENT_DATA, agentData});
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
    } catch (err) {
      console.log('Error', err);
    }
  };
};
