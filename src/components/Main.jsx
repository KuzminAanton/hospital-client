import React from 'react';
import { Button } from '@mui/material';
import Header from '../elements/Header';
import './Main.scss';

const Main = () => {
  const headerText = 'Приемы';

  return (
    <div>
      <Header
        headerText={headerText}
        children={<Button className="header-btn">Выйти</Button>}
      />
    </div>
  );
};

export default Main;
