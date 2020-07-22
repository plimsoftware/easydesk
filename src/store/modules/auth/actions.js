import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

export function logout(payload) {
  return {
    type: types.LOGOUT,
    payload,
  };
}

export function isEditing(payload) {
  return {
    type: types.ISEDITING,
    payload,
  };
}

export function cleanMessage(payload) {
  return {
    type: types.CLEAN_MESSAGE,
    payload,
  };
}

export function setMessage(payload) {
  return {
    type: types.SET_MESSAGE,
    payload,
  };
}
