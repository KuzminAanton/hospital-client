import React, { useContext, useState } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import axios from 'axios';
import Login from '../components/auth/Login';
import Registration from '../components/auth/Registration';
import { AuthContext } from '../AuthContext';

import '../components/auth/Auth.scss';

const Auth = (props) => {
  const { headerParam, setHeaderParam } = props;
  const [inputState, setInputState] = useState({
    loginValue: '',
    passwordValue: '',
    retryPasswordValue: '',
  });
  const { loginValue, passwordValue, retryPasswordValue } = inputState;
  const [errorAlertLog, setErrorAlertLog] = useState(false);
  const [errorAlertPass, setErrorAlertPass] = useState(false);
  const [errorAlertPassReplay, setErrorAlertPassReplay] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { login } = useContext(AuthContext);

  const formSubmit = (e, flag) => {
    if (!(loginValue || passwordValue || retryPasswordValue)) {
      setErrorText('Введите данные');
      setErrorAlertLog(true);
      setErrorAlertPass(true);
      setErrorAlertPassReplay(true);
    } else {
      setErrorAlertLog(false);
      setErrorAlertPass(false);
      setErrorAlertPassReplay(false);
      setErrorText('');
      if (loginValue.length < 6 || (!/[a-z]/.test(loginValue))) {
        setErrorText('Логин должен состоять из латинского алфавита и длиной не менее 6 символов');
        setErrorAlertLog(true);
        setErrorAlertPass(true);
        setErrorAlertPassReplay(true);
      } else {
        setErrorAlertLog(false);
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,20}$/;
        if (!regExp.test(passwordValue)) {
          setErrorAlertPass(true);
          setErrorAlertPassReplay(true);
          setErrorText('Некорректный пароль');
        } else {
          setErrorAlertPass(false);
          setErrorAlertPassReplay(false);
          setErrorText('');
          switch (flag) {
            case 'reg':
              if (!(passwordValue === retryPasswordValue)) {
                setErrorAlertPassReplay(true);
                setErrorAlertPass(true);
                setErrorText('Пароли не совпадают');
              } else {
                setErrorAlertPassReplay(false);
                setErrorText('');
                axios.post('http://localhost:5000/auth/newUser', {
                  login: loginValue,
                  password: passwordValue,
                }).then((res) => {
                  const { token } = res.data;
                  if (res.data) {
                    login(token);
                  }
                });
              }
              break;
            case 'log':
              axios.post('http://localhost:5000/auth/login', {
                login: loginValue,
                password: passwordValue,
              }).then((res) => {
                const { token } = res.data;
                if (token) {
                  login(token);
                }
              });
              break;
            default:
              setErrorText('error');
          }
        }
      }
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/login">
          <Login
            inputState={inputState}
            setInputState={setInputState}
            errorAlertLog={errorAlertLog}
            errorAlertPass={errorAlertPass}
            errorText={errorText}
            formSubmit={formSubmit}
            headerParam={headerParam}
            setHeaderParam={setHeaderParam}
          />
        </Route>
        <Route path="/auth/reg">
          <Registration
            inputState={inputState}
            setInputState={setInputState}
            errorAlertLog={errorAlertLog}
            errorAlertPass={errorAlertPass}
            errorAlertPassReplay={errorAlertPassReplay}
            errorText={errorText}
            formSubmit={formSubmit}
            headerParam={headerParam}
            setHeaderParam={setHeaderParam}
          />
        </Route>
      </Switch>
      <Redirect to="/auth/login" />
    </BrowserRouter>
  );
};

export default Auth;
