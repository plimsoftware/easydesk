import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const { data } = yield call(axios.get, `/users/${payload.userid}`);
    if (data.UserProfs.filter( UserProf => UserProf.profile=== payload.profile).length === 0) {
      yield put(actions.loginFailure({ msg: `Wrong profile for ${payload.userid}` }));
      return;
    }

    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push('/main');

  } catch (e) {
    yield put(actions.loginFailure({ msg: 'Username or password invalid' }));
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
