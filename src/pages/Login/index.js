import React, { useState } from 'react';

import { Container, Form, Button } from './styled';
import Menu from '../../components/Menu';
import ListCases from '../../components/ListCases';
import logo from '../../img/easydesk.png'

export default function Login() {
  const [userid, setUserID] = useState ('');
  const [password, setPassword] = useState ('');

  return (
      <Container>
        <img src={logo} alt="Easy Desk logo" />
        <span style={{ fontSize: '10px'}}>V 1.0.0</span>
        <h1>Welcome to Easy Desk Management</h1>
        <Form onSubmit={() => {}}>
          <input
            type="text"
            value={userid}
            onChange={() => {}}
            placeholder="Type Username"
            />
            <input
            type="text"
            value={password}
            onChange={() => {}}
            placeholder="Type Password"
            />
            <Button type="submit">Entrar</Button>
        </Form>
      </Container>
    );
}
