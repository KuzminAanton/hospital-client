import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../../elements/Header';
import Logo from '../../elements/Logo';
import './Auth.scss';

const Registration = () => {
  const [inputState, setInputState] = useState({
    login: '',
    password: '',
    retryPassword: '',
  });
  const [errorAlertLog, setErrorAlertLog] = useState(false);
  const [errorAlertPass, setErrorAlertPass] = useState(false);
  const [errorAlertPassReplay, setErrorAlertPassReplay] = useState(false);
  const [errorText, setErrorText] = useState('');

  const {
    login,
    password,
    retryPassword,
  } = inputState;

  const formSubmit = () => {
    if (!(login || password || retryPassword)) {
      setErrorText('Введите данные');
      setErrorAlertLog(true);
      setErrorAlertPass(true);
      setErrorAlertPassReplay(true);
    } else {
      setErrorAlertLog(false);
      setErrorAlertPass(false);
      setErrorAlertPassReplay(false);
      setErrorText('');
      if (login.length < 6 || (!/[a-z]/.test(login))) {
        setErrorText('Логин должен состоять из латинского алфавита и длиной не менее 6 символов');
        setErrorAlertLog(true);
        setErrorAlertPass(true);
        setErrorAlertPassReplay(true);
      } else {
        setErrorAlertLog(false);
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,20}$/;
        if (!regExp.test(password)) {
          setErrorAlertPass(true);
          setErrorAlertPassReplay(true);
          setErrorText('Некорректный пароль');
        } else {
          setErrorAlertPass(false);
          setErrorAlertPassReplay(false);
          setErrorText('');
          if (!(password === retryPassword)) {
            setErrorAlertPassReplay(true);
            setErrorAlertPass(true);
            setErrorText('Пароли не совпадают');
          } else {
            setErrorAlertPassReplay(false);
            setErrorText('');
          }
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
                onChange={(e) => setInputState({
                  ...inputState,
                  login: e.target.value,
                })}
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
                onChange={(e) => setInputState({
                  ...inputState,
                  password: e.target.value,
                })}
              />
            </div>
            <div className="auth-form-inputs-elem">
              <span>Repeat password:</span>
              <TextField
                error={errorAlertPassReplay}
                name="repeatPassword"
                type="password"
                placeholder="Password"
                value={retryPassword}
                onChange={(e) => setInputState({
                  ...inputState,
                  retryPassword: e.target.value,
                })}
              />
            </div>
          </div>
          <div className="auth-form__btns">
            <Button onClick={() => formSubmit()} variant="outlined">Зарегистрироваться</Button>
            <Link to="/auth/login">Авторизоваться</Link>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Registration;
