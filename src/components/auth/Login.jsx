import React, { useState } from 'react';
import {
  Box, Button, TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../../elements/Header';
import Logo from '../../elements/Logo';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorAlertLog, setErrorAlertLog] = useState(false);
  const [errorAlertPass, setErrorAlertPass] = useState(false);
  const [errorText, setErrorText] = useState('');

  const formSubmit = () => {
    if (!login && !password) {
      setErrorAlertLog(true);
      setErrorAlertPass(true);
      setErrorText('Введите данные');
    } else {
      setErrorAlertLog(false);
      setErrorText('');
      if (!login) {
        setErrorAlertLog(true);
        setErrorText('Введите логин');
      } else {
        setErrorAlertLog(false);
        setErrorText('');
        if (!password) {
          setErrorAlertPass(true);
          setErrorText('Введите пароль');
        } else {
          setErrorAlertPass(false);
          setErrorText('');
        }
      }
    }
  };

  return (
    <div>
      <Header headerText="Зарегистрироваться в системе" />
      <div className="auth__main">
        <Logo />
        <Box component="form" className="auth-form">
          <div className="auth-form__title">
            <p>Регистрация</p>
          </div>
          <div
            className={
              `auth-inputs-field-error__all ${errorText
                ? 'auth-inputs-field-error__active'
                : 'auth-inputs-field-error__disable'}`
            }
          >
            <p>{errorText}</p>
          </div>
          <div className="auth-form-inputs">
            <div className="auth-form-inputs-elem">
              <span>Login:</span>
              <TextField
                error={errorAlertLog}
                name="login"
                type="text"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="auth-form-inputs-elem">
              <span>Password:</span>
              <TextField
                error={errorAlertPass}
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="auth-form__btns">
            <Button onClick={formSubmit} variant="outlined">Авторизоваться</Button>
            <Link to="/auth/reg">Зарегистрироваться</Link>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;
