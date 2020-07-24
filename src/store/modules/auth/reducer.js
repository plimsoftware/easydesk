import * as types from '../types';
import axios from '../../../services/axios';

const initalState = {
  isLoggedIn: false,
  isEditing: {
    isEditing: false,
    response: ''
  },
  token: false,
  actualId: 0,
  client: {},
  messageWinState: {
    msgEnabled: false,
    msg: '',
    msgType: '',
    wheremsg: ''
  },

};

export default function (state = initalState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.client = action.payload.client;
      newState.actualId = action.payload.id;
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

    case types.LOGOUT: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initalState };
      return newState;
    }

    case types.ISEDITING: {
      const newState = { ...state };
      newState.isEditing = {
        isEditing: action.payload.isEditing,
        response: ''
      };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.SET_MESSAGE: {
      const newState = { ...state };
      newState.messageWinState = {
        msgEnabled: action.payload.msgEnabled,
        msg: action.payload.msg,
        msgType: action.payload.msgType,
        wheremsg: action.payload.wheremsg
      };
      return newState;
    }

    case types.CLEAN_MESSAGE: {
      const newState = { ...state };
      newState.messageWinState = {
        msgEnabled: false,
        msg: '',
        msgType: '',
        wheremsg: ''
      };
      return newState;
    }

    default: {
      return state;
    }
  }
}
