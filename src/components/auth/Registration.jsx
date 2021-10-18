import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../elements/Logo';

import './Auth.scss';

const Registration = (props) => {
  const {
    inputState,
    setInputState,
    errorState,
    formSubmit,
    headerParam,
    setHeaderParam,
  } = props.propsLogReg;
  const {
    errorAlertLog,
    errorAlertPass,
    errorAlertPassReplay,
    errorText,
  } = errorState;
  const {
    loginValue,
    passwordValue,
    retryPasswordValue,
  } = inputState;
  useEffect(() => {
    setHeaderParam({
      ...headerParam,
      text: 'Зарегистрироваться в системе',
      checkBtn: false,
    });
  }, []);

  return (
    <div>
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
              <p>Login:</p>
              <TextField
                error={errorAlertLog}
                name="login"
                type="text"
                placeholder="Login"
                value={loginValue}
                onChange={(e) => setInputState({
                  ...inputState,
                  loginValue: e.target.value,
                })}
              />
            </div>
            <div className="auth-form-inputs-elem">
              <p>Password:</p>
              <TextField
                error={errorAlertPass}
                name="password"
                type="password"
                placeholder="Password"
                value={passwordValue}
                onChange={(e) => setInputState({
                  ...inputState,
                  passwordValue: e.target.value,
                })}
              />
            </div>
            <div className="auth-form-inputs-elem">
              <p>Repeat password:</p>
              <TextField
                error={errorAlertPassReplay}
                name="repeatPassword"
                type="password"
                placeholder="Password"
                value={retryPasswordValue}
                onChange={(e) => setInputState({
                  ...inputState,
                  retryPasswordValue: e.target.value,
                })}
              />
            </div>
          </div>
          <div className="auth-form__btns">
            <Button
              className="auth-btns"
              onClick={(e) => formSubmit(e, 'reg')}
              variant="outlined"
            >
              Зарегистрироваться
            </Button>
            <Link to="/auth/login">Авторизоваться</Link>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Registration;
