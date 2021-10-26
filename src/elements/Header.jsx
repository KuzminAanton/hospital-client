import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { AuthContext } from '../AuthContext';
import './Header.scss';

const Header = () => {
  const selectorHeaderSlice = (state) => state.headerSlice.headerState;
  const { text, checkBtn } = useSelector(selectorHeaderSlice);
  const { logout } = useContext(AuthContext);

  return (
    <div className="header__container">
      <div className="header">
        <div className="header-title">
          <div className="header-title__logo">
            <img src="../images/icon-logo.svg" alt="logo" />
          </div>
          <div className="header-title__text">
            <p>{text}</p>
          </div>
        </div>
        {
          checkBtn
          && (
            <div className="header-btn">
              <Button onClick={() => logout()}>Выход</Button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Header;
