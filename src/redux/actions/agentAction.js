import axios from 'axios';
import {
  ADD_AGENT_URL,
  AGENT_BY_ID_URL,
  ALL_AGENT_URL,
  BASE_URL,
} from '../../api/apiConstants';
import {AGENT_DATA, ALL_AGENT_DATA} from './types';

export const addAgent = agentData => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + ADD_AGENT_URL;
    console.log('API URL', API_URL);
    try {
      const token = getState().user.token;
      axios
        .post(
          API_URL,
          {
            agentData,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then(async response => {
          console.log('Agent Action Add Response: ', response.data);
          alert('Agent added successfully!');
        })
        .catch(error => {
          console.log('Agent already exists', error);
          alert('Agent add error!');
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

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

export const allAgents = () => {
  return async (dispatch, getState) => {
    const API_URL = BASE_URL + ALL_AGENT_URL;
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
          let agentData = response.data;
          if (agentData) {
            agentData.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            dispatch({type: ALL_AGENT_DATA, agentData});
          } else {
            const agentData = [];
            dispatch({type: ALL_AGENT_DATA, agentData});
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
