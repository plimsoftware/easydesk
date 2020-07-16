import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    // toast.success('Bem-vindo à nossa loja!');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    if (payload.userType === 'client') {
      history.push(payload.prevPath);
    } else {
      history.push('/adminconsole');
    }
  } catch (e) {
    // toast.error('Email ou password inválida.');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const {
    id,
    name,
    surname,
    email,
    address1,
    address2,
    location,
    locationcp,
    phone,
    verificationCode,
    emailVerification,
    password,
  } = payload;

  try {
    if (id) {
      yield call(axios.put, `/clients/${id}`, {
        name,
        surname,
        email,
        address1,
        address2,
        location,
        locationcp,
        phone,
        password: password || undefined,
      });

      // toast.success('Conta alterada com sucesso.');
      yield put(actions.registerUpdatedSuccess({ name, email }));
      history.push('/profile');
    } else {
      yield call(axios.post, '/clients', {
        name,
        surname,
        email,
        address1,
        address2,
        location,
        locationcp,
        verification_code: verificationCode,
        email_verification: emailVerification,
        phone,
        password,
      });
      // toast.success('Conta criada com sucesso.');
      yield put(actions.registerCreatedSuccess({ name, email }));
      history.push('/login/index');
    }
  } catch (e) {
    const errors = get(e, 'response.data.message', [{}]);
    const status = get(e, 'response.status', 0);
    if (status === 401) {
      // toast.info('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => console.log(error) );
    } else {
      // toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

// eslint-disable-next-line consistent-return
function* updateAddress({ payload }) {
  const {
    id,
    address1Deliver,
    address2Deliver,
    locationDeliver,
    locationcpDeliver,
  } = payload;

  try {
    if (id) {
      yield call(axios.put, `/clients/${id}`, {
        address1deliver: address1Deliver,
        address2deliver: address2Deliver,
        locationdeliver: locationDeliver,
        locationcpdeliver: locationcpDeliver,
      });
    } else {
      // toast.info('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      // toast.info('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => console.log(error));
    } else {
      // toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

// eslint-disable-next-line consistent-return
function* removeAccount(payload) {
  const { id } = payload;

  try {
    if (id) {
      yield call(axios.delete, `/clients/${id}`);

      // toast.info('A sua conta foi eliminada.');
      yield put(actions.loginFailure());
      return history.push('/');
    }
    // toast.info('Você precisa fazer login novamente.');
    yield put(actions.loginFailure());
    return history.push('/login');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      // toast.info('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => console.log(error));
    } else {
      // toast.error('Erro desconhecido');
    }
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.UPDATE_ADDRESS, updateAddress),
  takeLatest(types.REMOVE_ACCOUNT, removeAccount),
]);
