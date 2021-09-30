import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';

const Auth = () => {

  return (
    <div>
      <Switch>
        <Route path="/auth/login/">
          <Login />
        </Route>
        <Route path="/auth/reg/">
          <Registration />
        </Route>
      </Switch>
    </div>
  );
};

export default Auth;
