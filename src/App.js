import './App.scss';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Auth from './components/auth/Auth';
import Main from './components/Main';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
