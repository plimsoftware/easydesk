import * as types from '../types';
import axios from '../../../services/axios';

const initalState = {
  isLoggedIn: false,
  token: false,
  client: {},
  messageWinState: {
    msgEnabled: false,
    msg: '',
    msgType: ''
  },

};

export default function (state = initalState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.client = action.payload.client;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initalState };
      newState.messageWinState = {
        msgEnabled: true,
        msg: action.payload.msg,
        msgType: 'error'
      };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.CLEAN_MESSAGE: {
      const newState = { ...state };
      newState.messageWinState = {
        msgEnabled: false,
        msg: '',
        msgType: ''
      };
      return newState;
    }

    default: {
      return state;
    }
  }
}
