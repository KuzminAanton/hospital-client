import React from 'react';

import './Header.scss';

const Header = (props) => {
  const { headerText, children } = props;

  return (
    <div className="header__container">
      <div className="header-title">
        <div className="header-title__logo">
          <img src="../images/icon-logo.svg" alt="logo" />
        </div>
        <div className="header-title__text">
          <p>
            {headerText}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
