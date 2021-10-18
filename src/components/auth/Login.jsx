import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../elements/Logo';

import './Auth.scss';

const Login = (props) => {
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
    errorText,
  } = errorState;
  const {
    loginValue,
    passwordValue,
  } = inputState;

  useEffect(() => {
    setHeaderParam({
      ...headerParam,
      text: 'Авторизация',
      checkBtn: false,
    });
  }, []);

  return (
    <div>
      <div className="auth__main">
        <Logo />
        <Box component="form" className="auth-form">
          <div className="auth-form__title">
            <p>Войти в систему</p>
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
          </div>
          <div className="auth-form__btns">
            <Button
              className="auth-btns"
              onClick={(e) => formSubmit(e, 'log')}
              variant="outlined"
            >
              Авторизоваться
            </Button>
            <Link to="/auth/reg">Зарегистрироваться</Link>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;
