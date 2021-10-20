import React, {
  useContext,
  useState,
} from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import moment from 'moment';
import EditAppointment from './EditAppointment';
import DeleteAppointment from './DeleteAppointment';
import './ModalWindows.scss';

const ModalWindow = (props) => {
  const {
    doctorsList,
    appointmentList,
    setAppointmentList,
    setAppointmentListTemp,
    index,
    typeModal,
  } = props;
  const { token, logout } = useContext(AuthContext);
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
    name: patientNameList,
    doctor: doctorNameList,
    date: dateList,
    complaints: complaintsList,
  });

  const editAppointment = async () => {
    const {
      name, doctor, date, complaints,
    } = inputValueEdit;
    await axios
      .patch(`http://localhost:5000/editAppointments?_id=${_idList}`, {
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
        setAppointmentList(data);
        setAppointmentListTemp(data);
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          logout();
        }
      });
    handleCloseModal();
  };

  const deleteAppointment = async () => {
    await axios
      .delete(`http://localhost:5000/deleteAppointments?_id=${_idList}`,
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
    handleCloseModal();
  };

  const changeDataInputAdd = (e) => {
    let temp = moment(e);
    temp = temp.format('MM-DD-YYYY');
    setInputValueEdit({
      ...inputValueEdit,
      date: temp,
    });
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
              changeDataInputAdd={changeDataInputAdd}
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
