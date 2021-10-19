import React, {
  useEffect,
  useState,
} from 'react';
import {
  Backdrop,
  Box,
  Button,
  Fade, FormControl, MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import EditAppointment from './EditAppointment';
import DeleteAppointment from './DeleteAppointment';
import './ModalWindows.scss';

const ModalWindow = (props) => {
  const {
    doctorsList,
    appointmentList,
    setAppointmentList,
    valueInputAdd,
    index,
    typeModal,
    token,
    logout,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const {
    _id: _idList,
    patientName: patientNameList,
    doctorName: doctorNameList,
    date: dateList,
    complaints: complaintsList,
  } = appointmentList[index];

  const [inputValueEdit, setInputValueEdit] = useState({
    name: '',
    doctor: '',
    date: '',
    complaints: '',
  });

  useEffect(() => {
    setInputValueEdit({
      ...valueInputAdd,
      name: patientNameList,
      doctor: doctorNameList,
      date: dateList,
      complaints: complaintsList,
    });
  }, []);

  const editAppointment = async () => {
    const {
      name, doctor, date, complaints,
    } = inputValueEdit;
    await axios.patch(`http://localhost:5000/editAppointments?_id=${_idList}`, {
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
      const { error, data } = res.data;
      if (!error) {
        setAppointmentList(data);
      } else {
        logout();
      }
    });
    handleCloseModal();
  };

  const deleteAppointment = async () => {
    await axios.delete(`http://localhost:5000/deleteAppointments?_id=${_idList}`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((res) => {
      if (!res.data.error) {
        const { error, data } = res.data;
        if (!error) {
          setAppointmentList(data);
        } else {
          logout();
        }
      }
    });
    handleCloseModal();
  };

  return (
    <>
      {
        typeModal === 'edit'
          ? (
            <EditAppointment
              doctorsList={doctorsList}
              openModal={openModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              inputValueEdit={inputValueEdit}
              setInputValueEdit={setInputValueEdit}
              editAppointment={editAppointment}
            />
          )
          : (
            <DeleteAppointment
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              openModal={openModal}
              deleteAppointment={deleteAppointment}
            />
          )
      }
    </>
  );
};

export default ModalWindow;
