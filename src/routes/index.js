import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Login from '../pages/Login';
import ChangePass from '../pages/ChangePass';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/main" component={Main} />
      <Route exact path="/changepass" component={ChangePass} />
    </Switch>
  )
}
