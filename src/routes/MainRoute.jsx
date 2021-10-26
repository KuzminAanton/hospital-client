import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './Auth';
import Main from '../components/Main';

const MainRoute = (props) => {
  const { isLogin } = props;
  if (isLogin) {
    return (
      <Switch>
        <Route path="/main" exact>
          <Main />
        </Route>
        <Redirect to="/main" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
};

export default MainRoute;
