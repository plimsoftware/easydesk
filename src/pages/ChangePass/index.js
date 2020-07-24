import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Form, Button } from './styled';
import logo from '../../img/easydesk.png'
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import MessageWin from '../../components/MessageWin';

export default function Login() {
  const [password, setPassword] = useState ('');
  const [repassword, setRepassword] = useState('');
  const { msgEnabled, msg, msgType } = useSelector((state) => state.auth.messageWinState);
  const { actualId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== repassword) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Passwords dont match',
        msgType: 'error'
      }));
      return;
    }

    if (password.length < 6 || password.length > 50) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Password must have between 6 and 50 characters',
        msgType: 'error'
      }));
      return;
    }

    try {
      await axios.put('/users/changepassword/', {
        id: actualId,
        password
      });

      dispatch(actions.logout());
      history.push('/');

    } catch (err) {
      console.log(err);
    }
  }

  return (
      <Container>
        <MessageWin msgEnabled={msgEnabled} message={msg} msgType={msgType} />
        <img src={logo} alt="Easy Desk logo" />
        <span style={{ fontSize: '10px'}}>V 1.0.0</span>
        <h1>You need to Change your Password</h1>
        <Form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Type Password"
            />
          <input
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.currentTarget.value)}
            placeholder="Retype Password"
            />
          <Button type="submit">Change Password</Button>
        </Form>
      </Container>
    );
}
