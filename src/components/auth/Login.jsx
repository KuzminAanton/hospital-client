import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../elements/Logo';
import { changeInputState } from '../../redux/slice/authorizationSlice';
import { changeHeaderState } from '../../redux/slice/headerSlice';
import './Auth.scss';

const Login = (props) => {
  const dispatch = useDispatch();
  const selectorAuthorizationSlice = (state) => state.authorizationSlice.inputState;
  const { loginValue, passwordValue } = useSelector(selectorAuthorizationSlice);

  const changeValueInputFunc = (e, flag) => {
    dispatch(changeInputState({
      text: e.target.value,
      flagInput: flag,
    }));
  };

  const {
    formSubmit,
    errorState,
  } = props;
  const {
    errorAlertLog,
    errorAlertPass,
    errorText,
  } = errorState;

  useEffect(() => {
    dispatch(changeHeaderState({
      text: 'Авторизация',
      checkBtn: false,
    }));
  }, []);

  return (
    <div>
      <div className="auth__main">
        <Logo />
        <Box component="form" className="auth-form">
          <div className="auth-form__title">
            <p>Авторизация</p>
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
          </div>
          <div className="auth-form__btns">
            <Button onClick={(e) => formSubmit(e, 'log')} variant="outlined">Авторизоваться</Button>
            <Link to="/auth/reg">Зарегистрироваться</Link>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;
