import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Login from '../pages/Login';
import ChangePass from '../pages/ChangePass';
import ClientList from '../pages/ClientList';
import UserList from '../pages/UserList';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/main" component={Main} />
      <Route exact path="/changepass" component={ChangePass} />
      <Route exact path="/clientlist" component={ClientList} />
      <Route exact path="/userlist" component={UserList} />
    </Switch>
  )
}
