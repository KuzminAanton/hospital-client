import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hooks';
import { AuthContext } from './AuthContext';
import MainRoute from './routes/MainRoute';
import Header from './elements/Header';

import './App.scss';

const App = () => {
  const [headerParam, setHeaderParam] = useState({
    text: '',
    checkBtn: false,
  });
  const {
    login, logout, token, userId,
  } = useAuth();
  const isLogin = !!token;

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      userId,
      isLogin,
    }}
    >
      <div className="App">
        <Header headerParam={headerParam} />
        <BrowserRouter>
          <MainRoute isLogin={isLogin} headerParam={headerParam} setHeaderParam={setHeaderParam} />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
