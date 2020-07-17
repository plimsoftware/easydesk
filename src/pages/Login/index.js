import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Form, Button } from './styled';
import logo from '../../img/easydesk.png'
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import MessageWin from '../../components/MessageWin';

export default function Login() {
  const [userid, setUserID] = useState ('');
  const [password, setPassword] = useState ('');
  const [profileList, setProfileList] = useState([]);
  const [profile, setProfile] = useState('Administrator');
  const { msgEnabled, msg, msgType } = useSelector((state) => state.auth.messageWinState);

  /* ***** MSG Component ************
  const [msgEnabled, setMsgEnabled] = useState(messageWinState.msgEnabled);
  const [msg, setMsg] = useState(messageWinState.msg);
  const [msgType, setMsgType] = useState(messageWinState.msgType);
  ***** MSG Component ************ */

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProfile() {
      try {
        const { data } = await axios.get('/profile/');

        setProfileList(data);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const data = get(err, 'response.data', {});
        const errors = get(data, 'errors', []);
        if (status === 401) {
          history.push('/');
        }
      }
    }

    getProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(actions.loginRequest({ userid, password, profile }));
  }

  return (
      <Container>
        <MessageWin msgEnabled={msgEnabled} message={msg} msgType={msgType} />
        <img src={logo} alt="Easy Desk logo" />
        <span style={{ fontSize: '10px'}}>V 1.0.0</span>
        <h1>Welcome to Easy Desk Management</h1>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userid}
            onChange={(e) => setUserID(e.currentTarget.value)}
            placeholder="Type Username"
            />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Type Password"
            />
          <select
            id="profile"
            name="profile"
            value={profile}
            onChange={(e) => setProfile(e.currentTarget.value)}
          >
          {profileList.map((prof) => (
              <option value={prof.name} key={prof.name}>
                {prof.name}
              </option>
            ))}
          </select>
          <Button type="submit">Entrar</Button>
        </Form>
      </Container>
    );
}
