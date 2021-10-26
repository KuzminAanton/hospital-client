import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../elements/Logo';
import { changeInputState } from '../../redux/slice/authorizationSlice';
import { changeHeaderState } from '../../redux/slice/headerSlice';
import './Auth.scss';

const Registration = (props) => {
  const dispatch = useDispatch();
  const selectorAuthorizationSlice = (state) => state.authorizationSlice.inputState;
  const {
    loginValue,
    passwordValue,
    retryPasswordValue,
  } = useSelector(selectorAuthorizationSlice);
  const {
    errorState,
    formSubmit,
  } = props;
  const {
    errorAlertLog,
    errorAlertPass,
    errorAlertPassReplay,
    errorText,
  } = errorState;

  useEffect(() => {
    dispatch(changeHeaderState({
      text: 'Зарегистрироваться в системе',
      checkBtn: false,
    }));
  }, []);

  const changeValueInputFunc = (e, flag) => {
    dispatch(changeInputState({
      text: e.target.value,
      flagInput: flag,
    }));
  };

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
                onChange={(e) => changeValueInputFunc(e, 'LOGIN')}
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
                onChange={(e) => changeValueInputFunc(e, 'PASSWORD')}
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
                onChange={(e) => changeValueInputFunc(e, 'RETRY_PASSWORD')}
              />
            </div>
          </div>
          <div className="auth-form__btns">
            <Button onClick={(e) => formSubmit(e, 'reg')} variant="outlined">Зарегистрироваться</Button>
            <Link to="/auth/login">Авторизоваться</Link>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Registration;
