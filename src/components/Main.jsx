import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { AuthContext } from '../AuthContext';
import ModalWindow from '../elements/ModalWindow';
import './Main.scss';

const Main = (props) => {
  const { headerParam, setHeaderParam } = props;
  const { token, logout } = useContext(AuthContext);
  const [doctorsList, setDoctorsList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentListTemp, setAppointmentListTemp] = useState([]);
  const [checkDateAreaFilter, setCheckDateAreaFilter] = useState(false);
  const [checkMainFilter, setCheckMainFilter] = useState({
    typeFilter: 'empty',
    direction: '',
  });
  const [valueInputAdd, setValueInputAdd] = useState({
    name: '',
    doctor: '',
    date: null,
    complaints: '',
  });
  const [dateFilter, setDateFilter] = useState({
    dateStart: null,
    dateEnd: null,
  });
  const {
    name,
    doctor,
    date,
    complaints,
  } = valueInputAdd;

  useEffect(() => {
    setHeaderParam({
      ...headerParam,
      text: 'Приемы',
      checkBtn: true,
    });
  }, []);

  useEffect(async () => {
    await axios
      .get('http://localhost:5000/getAppointments',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        })
      .then((res) => {
        const { data } = res.data;
        setAppointmentList(data);
        setAppointmentListTemp(data);
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          logout();
        }
      });
  }, [setAppointmentList]);

  useEffect(async () => {
    await axios
      .get('http://localhost:5000/getDoctors',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        })
      .then((res) => {
        const { data } = res.data;
        setDoctorsList(data);
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          logout();
        }
      });
  }, [setDoctorsList]);

  const addNewAppointment = async () => {
    await axios
      .post('http://localhost:5000/addAppointments', {
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
      })
      .then((res) => {
        const { data } = res.data;
        setValueInputAdd({
          name: '',
          doctor: '',
          date: null,
          complaints: '',
        });
        setAppointmentList(data);
        setAppointmentListTemp(data);
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          logout();
        }
      });
  };

  const changeDateFilter = () => {
    setCheckDateAreaFilter(!checkDateAreaFilter);
    setAppointmentList(_.sortBy(appointmentListTemp, 'date'));
    setDateFilter({
      dateStart: null,
      dateEnd: null,
    });
  };

  const directionFilterFunc = (e) => {
    const { value } = e.target;
    setCheckMainFilter({
      ...checkMainFilter,
      direction: e.target.value,
    });
    if (value === 'reset') {
      setAppointmentList(() => appointmentListTemp);
    } else {
      setAppointmentList(_.orderBy(appointmentList,
        [`${checkMainFilter.typeFilter}`],
        [`${value}`]));
    }
  };

  const typeFilterFunc = (e) => {
    const { value } = e.target;
    setCheckMainFilter({
      ...checkMainFilter,
      typeFilter: value,
    });
  };

  const filterChange = (e, value) => {
    switch (value) {
      case 'typeFilter':
        typeFilterFunc(e);
        break;
      case 'direction':
        directionFilterFunc(e);
        break;
      default:
        setCheckMainFilter(() => ({
          ...checkMainFilter,
        }));
    }
  };

  const dateFilterFunc = (e, value) => {
    let valueDate = moment(e);
    valueDate = valueDate.format('MM-DD-YYYY');
    switch (value) {
      case 'start':
        setDateFilter(() => ({
          ...dateFilter,
          dateStart: valueDate,
        }));
        break;
      case 'end':
        setDateFilter(() => ({
          ...dateFilter,
          dateEnd: valueDate,
        }));
        break;
      default:
        setDateFilter(() => ({
          ...dateFilter,
        }));
    }
  };

  const dateTextCorrect = (val) => {
    const t = val.split('-');
    return `${t[1]}.${t[0]}.${t[2]}`;
  };

  const changeDataInputAdd = (e) => {
    let temp = moment(e);
    temp = temp.format('MM-DD-YYYY');
    setValueInputAdd({
      ...valueInputAdd,
      date: temp,
    });
  };

  const clearDateFilter = () => {
    setDateFilter(() => ({
      ...dateFilter,
      dateStart: null,
      dateEnd: null,
    }));
  };

  const filterListItem = [
    [
      {
        value: 'empty',
        text: 'Не выбрано',
      },
      {
        value: 'patientName',
        text: 'По имени',
      },
      {
        value: 'doctorName',
        text: 'По врачу',
      },
      {
        value: 'date',
        text: 'По дате',
      },
    ],
    [
      {
        value: 'reset',
        text: 'По умолчанию',
      },
      {
        value: 'asc',
        text: 'По возрастанию',
      },
      {
        value: 'desc',
        text: 'По убыванию',
      },
    ],
  ];

  const tableHeaderRender = [
    {
      className: 'main-content-table__name',
      text: 'Имя',
    },
    {
      className: 'main-content-table__doctor',
      text: 'Врач',
    },
    {
      className: 'main-content-table__date',
      text: 'Дата',
    },
    {
      className: 'main-content-table__complaints',
      text: 'Жалобы',
    },
    {
      className: 'main-content-table__plug',
      text: '',
    },
  ];

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
                  value={name}
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
                  value={doctor}
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    dateFormat="dd/MM/yyyy"
                    toolbarPlaceholder=""
                    value={valueInputAdd.date}
                    onChange={(e) => changeDataInputAdd(e)}
                    renderInput={
                      (params) => (
                        <TextField
                          className="main-top-inputs-fields main-top-inputs-fields__modal"
                          {...params}
                        />
                      )
                    }
                  />
                </LocalizationProvider>
              </div>
              <div className="main-top-inputs__label">
                <p>Жалобы:</p>
                <TextField
                  name="complaints"
                  className="main-top-inputs-fields"
                  value={complaints}
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
                    value={checkMainFilter.typeFilter === 'empty' ? '' : checkMainFilter.typeFilter}
                    onChange={(e) => filterChange(e, 'typeFilter')}
                  >
                    {
                      filterListItem[0].map((value) => (
                        <MenuItem
                          value={value.value}
                        >
                          {value.text}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </div>
                {
                  checkMainFilter.typeFilter !== 'empty'
                  && (
                    <div className="main-content-sort-input">
                      <span>Направление:</span>
                      <Select
                        className="main-content-sort-input-fields"
                        value={checkMainFilter.direction || 'reset'}
                        onChange={(e) => filterChange(e, 'direction')}
                      >
                        {
                          filterListItem[1].map((value) => (
                            <MenuItem
                              value={value.value}
                            >
                              {value.text}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </div>
                  )
                }
                <div className="main-content-sort-date-sort">
                  <span>
                    {
                      !checkDateAreaFilter
                        ? 'Добавить фильтр по дате:'
                        : 'Убрать фильтр по дате'
                    }
                  </span>
                  <Button onClick={() => changeDateFilter()}>
                    <div className="main-content-sort-date-sort-icon">
                      {
                        !checkDateAreaFilter
                          ? <img src="../images/icon-add.svg" alt="" />
                          : <img src="../images/icon-delete-big.svg" alt="" />
                      }
                    </div>
                  </Button>
                </div>
              </div>
              {
                checkDateAreaFilter
                && (
                  <div className="main-top-inputs active">
                    <div className="main-top-inputs__label main-top-inputs__label__margin">
                      <p>C:</p>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="dd/MM/yyyy"
                          dateFormat="dd/MM/yyyy"
                          toolbarPlaceholder=""
                          value={dateFilter.dateStart}
                          onChange={(e) => dateFilterFunc(e, 'start')}
                          renderInput={
                            (params) => (
                              <TextField
                                className="main-top-inputs-fields main-top-inputs-fields__modal"
                                {...params}
                              />
                            )
                          }
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="main-top-inputs__label">
                      <p>По:</p>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="dd/MM/yyyy"
                          dateFormat="dd/MM/yyyy"
                          toolbarPlaceholder=""
                          value={dateFilter.dateEnd}
                          onChange={(e) => dateFilterFunc(e, 'end')}
                          renderInput={
                            (params) => (
                              <TextField
                                className="main-top-inputs-fields main-top-inputs-fields__modal"
                                {...params}
                              />
                            )
                          }
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="main-top-inputs-btns">
                      <div className="main-top-inputs-btn">
                        <Button>
                          Фильтровать
                        </Button>
                      </div>
                      <div className="main-top-inputs-btn-deactivate">
                        <Button
                          onClick={() => clearDateFilter()}
                        >
                          <div className="main-top-inputs-btn-deactivate">
                            <img src="../images/icon-delete-big.svg" alt="" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <div className="main-content-table">
              <div className="main-content-table-header">
                {
                  tableHeaderRender.map((value) => (
                    <div className={`main-content-table__column ${value.className}`}>
                      <span>{value.text}</span>
                    </div>
                  ))
                }
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
                        <span>{dateTextCorrect(value.date)}</span>
                      </div>
                      <div className="main-content-table__complaints table-body in-row main-content-table__column">
                        <span>{value.complaints}</span>
                      </div>
                      <div className="main-content-table__plug table-body in-row main-content-table__column">
                        <ModalWindow
                          doctorsList={doctorsList}
                          appointmentList={appointmentList}
                          setAppointmentList={setAppointmentList}
                          setAppointmentListTemp={setAppointmentListTemp}
                          valueInputAdd={valueInputAdd}
                          index={index}
                          typeModal="edit"
                          token={token}
                          logout={logout}
                        />
                        <ModalWindow
                          appointmentList={appointmentList}
                          setAppointmentList={setAppointmentList}
                          setAppointmentListTemp={setAppointmentListTemp}
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
