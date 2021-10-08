import React, { useContext, useEffect, useState } from 'react';
import {
  Backdrop, Box,
  Button, Fade, FormControl, MenuItem, Modal, Select, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './Main.scss';
import ModalWindow from '../elements/ModalWindow';

const Main = (props) => {
  const { headerParam, setHeaderParam } = props;
  const { token } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [doctorsList, setDoctorsList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [checkMainFilter, setCheckMainFilter] = useState('');
  const [checkDateAreaFilter, setCheckDateAreaFilter] = useState(false);
  const [valueInputAdd, setValueInputAdd] = useState({
    name: '',
    doctor: '',
    date: '',
    complaints: '',
  });

  useEffect(() => {
    setHeaderParam({
      ...headerParam,
      text: 'Приемы',
      checkBtn: true,
    });
  }, []);

  useEffect(async () => {
    await axios.post('http://localhost:5000/getAppointments', {},
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((res) => {
      if (!res.data.error) {
        setAppointmentList(res.data.data);
      } else {
        logout();
      }
    });
  }, [setAppointmentList]);

  useEffect(async () => {
    await axios.post('http://localhost:5000/getDoctors', {},
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((res) => {
      if (!res.data.error) {
        setDoctorsList(res.data.data);
      } else {
        logout();
      }
    });
  }, [setDoctorsList]);



  const addNewAppointment = async () => {
    const {
      name, doctor, date, complaints,
    } = valueInputAdd;
    await axios.post('http://localhost:5000/addAppointments', {
      patientName: name,
      doctorName: doctor,
      date,
      complaints,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    }).then((res) => {
      setAppointmentList(res.data.data);
      setValueInputAdd({
        name: '',
        doctor: '',
        date: '',
        complaints: '',
      });
    });
  };

  return (
    <div>
      <FormControl className="main-control">
        <div className="main-global">
          <div className="main-top__wrapper">
            <div className="main-top-inputs">
              <div className="main-top-inputs__label">
                <p>Имя:</p>
                <TextField
                  name="name"
                  className="main-top-inputs-fields"
                  value={valueInputAdd.name}
                  onChange={(e) => setValueInputAdd({
                    ...valueInputAdd,
                    name: e.target.value,
                  })}
                />
              </div>
              <div className="main-top-inputs__label">
                <p>Доктор:</p>
                <Select
                  name="doctor"
                  className="main-top-inputs-fields doctor-list"
                  value={valueInputAdd.doctor}
                  onChange={(e) => setValueInputAdd({
                    ...valueInputAdd,
                    doctor: e.target.value,
                  })}
                >
                  {doctorsList.map((value, index) => (
                    <MenuItem key={index} value={value.doctor}>{value.doctor}</MenuItem>
                  ))}
                </Select>

              </div>
              <div className="main-top-inputs__label">
                <p>Дата:</p>
                <TextField
                  name="date"
                  type="date"
                  className="main-top-inputs-fields"
                  value={valueInputAdd.date}
                  onChange={(e) => setValueInputAdd({
                    ...valueInputAdd,
                    date: e.target.value,
                  })}
                />
              </div>
              <div className="main-top-inputs__label">
                <p>Жалобы:</p>
                <TextField
                  name="complaints"
                  className="main-top-inputs-fields"
                  value={valueInputAdd.complaints}
                  onChange={(e) => setValueInputAdd({
                    ...valueInputAdd,
                    complaints: e.target.value,
                  })}
                />
              </div>
            </div>
            <div className="main-top-btns">
              <Button
                disabled={Object.values(valueInputAdd).includes('')}
                onClick={() => addNewAppointment()}
              >
                Добавить
              </Button>
            </div>
          </div>
        </div>
        <div className="main-control">
          <div className="main-content">
            <div className="main-content-sort">
              <div className="main-content-sort__wrapper">
                <div className="main-content-sort-input">
                  <span>Сортировать по:</span>
                  <Select
                    className="main-content-sort-input-fields"
                    value={checkMainFilter === 'empty' ? '' : checkMainFilter}
                    onChange={(e) => setCheckMainFilter(e.target.value)}
                  >
                    <MenuItem value="empty">Не выбрано</MenuItem>
                    <MenuItem value="name">По имени</MenuItem>
                    <MenuItem value="doctor">По врачу</MenuItem>
                    <MenuItem value="date">По дате</MenuItem>
                  </Select>
                </div>
                {
                  checkMainFilter === 'date' && !checkDateAreaFilter
                    ? (
                      <div className="main-content-sort-date-sort">
                        <span>Добавить фильтр по дате:</span>
                        <Button onClick={() => setCheckDateAreaFilter(!checkDateAreaFilter)}>
                          <div className="main-content-sort-date-sort-icon">
                            <img src="../images/icon-add.svg" alt="" />
                          </div>
                        </Button>
                      </div>
                    )
                    : checkMainFilter === 'doctor' || checkMainFilter === 'name'
                      ? (
                        <div className="main-content-sort-input">
                          <span>Направление:</span>
                          <Select
                            className="main-content-sort-input-fields"
                          >
                            <MenuItem value="incr">По возрастанию</MenuItem>
                            <MenuItem value="decr">По убыванию</MenuItem>
                          </Select>
                        </div>
                      )
                      : <></>
                }
              </div>
              {
                checkMainFilter === 'date' && checkDateAreaFilter
                  ? (
                    <div className="main-top-inputs active">
                      <div className="main-top-inputs__label">
                        <p>C:</p>
                        <TextField type="date" className="main-top-inputs-fields active" />
                      </div>
                      <div className="main-top-inputs__label">
                        <p>По:</p>
                        <TextField type="date" className="main-top-inputs-fields" />
                      </div>
                      <div className="main-top-inputs-btn">
                        <Button>Фильтровать</Button>
                      </div>
                      <div className="main-top-inputs-btn-deactivate">
                        <Button onClick={() => setCheckDateAreaFilter(!checkDateAreaFilter)}>
                          <div className="main-top-inputs-btn-deactivate">
                            <img src="../images/icon-delete-big.svg" alt="" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  )
                  : <></>
              }
            </div>
            <div className="main-content-table">
              <div className="main-content-table-header">
                <div className="main-content-table__name main-content-table__column">
                  <span>Имя</span>
                </div>
                <div className="main-content-table__doctor main-content-table__column">
                  <span>Врач</span>
                </div>
                <div className="main-content-table__date main-content-table__column">
                  <span>Дата</span>
                </div>
                <div className="main-content-table__complaints main-content-table__column">
                  <span>Жалобы</span>
                </div>
                <div className="main-content-table__plug main-content-table__column" />
              </div>
              <div className="main-content-table-body">
                {
                  appointmentList.map((value, index) => (
                    <div key={index + 1} className="main-content-table-row">
                      <div className="main-content-table__name table-body in-row main-content-table__column">
                        <span>{value.patientName}</span>
                      </div>
                      <div className="main-content-table__doctor table-body in-row main-content-table__column">
                        <span>{value.doctorName}</span>
                      </div>
                      <div className="main-content-table__date table-body in-row main-content-table__column">
                        <span>{value.date}</span>
                      </div>
                      <div className="main-content-table__complaints table-body in-row main-content-table__column">
                        <span>{value.complaints}</span>
                      </div>
                      <div className="main-content-table__plug table-body in-row main-content-table__column">
                        {/*<Button onClick={() => handleOpenModal()}>*/}
                        {/*  <img src="../images/icon-delete.svg" alt="img"/>*/}
                        {/*</Button>*/}
                        {/*<Button>*/}
                        {/*  <img src="../images/icon-edit.svg" alt="img"/>*/}
                        {/*</Button>*/}
                        <ModalWindow
                          doctorsList={doctorsList}
                          appointmentList={appointmentList}
                          setAppointmentList={setAppointmentList}
                          valueInputAdd={valueInputAdd}
                          index={index}
                          typeModal="edit"
                          logout={logout}
                        />
                        <ModalWindow
                          appointmentList={appointmentList}
                          setAppointmentList={setAppointmentList}
                          index={index}
                          typeModal="deleted"
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default Main;
