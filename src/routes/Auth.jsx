import React, { useContext, useState } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import axios from 'axios';
import Login from '../components/auth/Login';
import Registration from '../components/auth/Registration';
import { AuthContext } from '../AuthContext';
import '../components/auth/Auth.scss';

const Auth = (props) => {
  const { headerParam, setHeaderParam } = props;
  const { login } = useContext(AuthContext);
  const [inputState, setInputState] = useState({
    loginValue: '',
    passwordValue: '',
    retryPasswordValue: '',
  });
  const { loginValue, passwordValue, retryPasswordValue } = inputState;
  const [errorState, setErrorState] = useState({
    errorAlertLog: false,
    errorAlertPass: false,
    errorAlertPassReplay: false,
    errorText: '',
  });

  const formSubmit = (e, flag) => {
    if (!(loginValue || passwordValue || retryPasswordValue)) {
      setErrorState(() => ({
        errorAlertLog: true,
        errorAlertPass: true,
        errorAlertPassReplay: true,
        errorText: 'Введите данные',
      }));
    } else {
      setErrorState(() => ({
        errorAlertLog: false,
        errorAlertPass: false,
        errorAlertPassReplay: false,
        errorText: '',
      }));
      if (loginValue.length < 6 || (!/[a-z]/.test(loginValue))) {
        setErrorState(() => ({
          errorAlertLog: true,
          errorAlertPass: true,
          errorAlertPassReplay: true,
          errorText: 'Логин должен состоять из латинского алфавита и длиной не менее 6 символов',
        }));
      } else {
        setErrorState(() => ({
          ...errorState,
          errorAlertLog: false,
        }));
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,20}$/;
        if (!regExp.test(passwordValue)) {
          setErrorState(() => ({
            ...errorState,
            errorAlertPass: true,
            errorAlertPassReplay: true,
            errorText: 'Некорректный пароль',
          }));
        } else {
          setErrorState(() => ({
            ...errorState,
            errorAlertLog: false,
            errorAlertPass: false,
            errorAlertPassReplay: false,
            errorText: '',
          }));
          switch (flag) {
            case 'reg':
              if (!(passwordValue === retryPasswordValue)) {
                setErrorState(() => ({
                  ...errorState,
                  errorAlertPass: true,
                  errorAlertPassReplay: true,
                  errorText: 'Пароли не совпадают',
                }));
              } else {
                setErrorState(() => ({
                  ...errorState,
                  errorAlertPassReplay: false,
                  errorText: '',
                }));
                axios
                  .post('http://localhost:5000/auth/newUser', {
                    login: loginValue,
                    password: passwordValue,
                  })
                  .then((res) => {
                    const { token } = res.data;
                    login(token);
                  })
                  .catch((err) => {
                    const { status } = err.response;
                    if (status === 402) {
                      setErrorState(() => ({
                        ...errorState,
                        errorText: 'Логин уже зарегистрирован',
                      }));
                    }
                  });
              }
              break;
            case 'log':
              axios
                .post('http://localhost:5000/auth/login', {
                  login: loginValue,
                  password: passwordValue,
                })
                .then((res) => {
                  const { token } = res.data;
                  login(token);
                })
                .catch((err) => {
                  const { status } = err.response;
                  switch (status) {
                    case 404:
                      setErrorState(() => ({
                        ...errorState,
                        errorText: 'Логин не зарегистрирован',
                      }));
                      break;
                    case 401:
                      setErrorState(() => ({
                        ...errorState,
                        errorText: 'Неверный пароль',
                      }));
                      break;
                    default:
                      setErrorState(() => ({
                        ...errorState,
                        errorText: '',
                      }));
                  }
                });
              break;
            default:
              setErrorState(() => ({
                ...errorState,
                errorText: 'Пароли не совпадают',
              }));
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
            errorState={errorState}
            formSubmit={formSubmit}
            headerParam={headerParam}
            setHeaderParam={setHeaderParam}
          />
        </Route>
        <Route path="/auth/reg">
          <Registration
            inputState={inputState}
            setInputState={setInputState}
            errorState={errorState}
            formSubmit={formSubmit}
            headerParam={headerParam}
            setHeaderParam={setHeaderParam}
          />
        </Route>
      </Switch>
      <Redirect to="/auth/login" from="/" />
    </BrowserRouter>
  );
};

export default Auth;
