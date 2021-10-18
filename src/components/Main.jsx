import React, { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import './Main.scss';

const Main = (props) => {
  const { headerParam, setHeaderParam } = props;
  useEffect(() => {
    setHeaderParam({
      ...headerParam,
      text: 'Приемы',
      checkBtn: true,
    });
  }, []);
  return (
    <div>
      <div className="main-global">
        <div className="main-top__wrapper">
          <div className="main-top-inputs">
            <div className="main-top-inputs__label">
              <p>Имя:</p>
              <TextField className="main-top-inputs-fields" />
            </div>
            <div className="main-top-inputs__label">
              <p>Доктор:</p>
              <TextField className="main-top-inputs-fields" />
            </div>
            <div className="main-top-inputs__label">
              <p>Дата:</p>
              <TextField className="main-top-inputs-fields" />
            </div>
            <div className="main-top-inputs__label">
              <p>Жалобы:</p>
              <TextField className="main-top-inputs-fields" />
            </div>
          </div>
          <div className="main-top-btns">
            <Button>Добавить</Button>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="main-content-sort">
          <div className="main-content-sort-input">
            <span>Сортировать по:</span>
            <TextField className="main-content-sort-input-fields" />
          </div>
          <div className="main-content-sort-date-sort">
            <span>Добавить фильтр по дате:</span>
            <Button>+</Button>
          </div>
        </div>
        <div className="main-content-table">
          <div className="main-content-table-header">
            <div className="main-content-table__name" />
            <div className="main-content-table__doctor" />
            <div className="main-content-table__date" />
            <div className="main-content-table__complaints" />
            <div className="main-content-table__plug" />
          </div>
          <div className="main-content-table-body">
            <div className="main-content-table__name table-body" />
            <div className="main-content-table__doctor table-body" />
            <div className="main-content-table__date table-body" />
            <div className="main-content-table__complaints table-body" />
            <div className="main-content-table__controls table-body" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
