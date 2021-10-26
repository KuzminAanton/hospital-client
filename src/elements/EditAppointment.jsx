import React, { useContext, useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { changeAppointmentState, changeAppointmentTempState } from '../redux/slice/appointmentSlice';
import { AuthContext } from '../AuthContext';

const EditAppointment = (props) => {
  const {
    index,
    openModal,
    handleOpenModal,
    handleCloseModal,
  } = props;
  const dispatch = useDispatch();
  const selectorAppointmentSlice = (state) => state.appointmentSlice;
  const { appointmentList, doctorsList } = useSelector(selectorAppointmentSlice);
  const { token, logout } = useContext(AuthContext);
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
  const {
    name,
    doctor,
    date,
    complaints,
  } = inputValueEdit;

  const changeDataInputAdd = (e) => {
    let temp = moment(e);
    temp = temp.format('MM-DD-YYYY');
    setInputValueEdit({
      ...inputValueEdit,
      date: temp,
    });
  };

  const handleCloseModalEdit = () => {
    setInputValueEdit(() => ({
      name: patientNameList,
      doctor: doctorNameList,
      date: dateList,
      complaints: complaintsList,
    }));
    handleCloseModal();
  };

  const editAppointment = async () => {
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
        dispatch(changeAppointmentState(data));
        dispatch(changeAppointmentTempState(data));
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          logout();
        }
      });
    handleCloseModalEdit();
  };

  return (
    <div>
      <Button onClick={() => handleOpenModal()}>
        <img src="../images/icon-edit.svg" alt="img" />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={openModal}>
          <Box className="modal-ed">
            <div className="modal-edit">
              <div className="modal-edit-header">
                <h3>Изменить прием</h3>
              </div>
              <FormControl>
                <div className="modal-edit-form">
                  <div className="modal-edit-form__input-elem">
                    <p>Имя:</p>
                    <TextField
                      value={name}
                      onChange={(e) => setInputValueEdit({
                        ...inputValueEdit,
                        name: e.target.value,
                      })}
                    />
                  </div>
                  <div className="modal-edit-form__input-elem">
                    <Select
                      name="doctor"
                      className="main-top-inputs-fields doctor-list"
                      value={doctor}
                      onChange={(e) => setInputValueEdit({
                        ...inputValueEdit,
                        doctor: e.target.value,
                      })}
                    >
                      {doctorsList.map((value, index) => (
                        <MenuItem key={index} value={value.doctor}>{value.doctor}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="modal-edit-form__input-elem">
                    <p>Дата:</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        dateFormat="dd/MM/yyyy"
                        value={date}
                        onChange={(e) => changeDataInputAdd(e)}
                        renderInput={
                          (params) => (
                            <TextField
                              className="main-top-inputs-fields modal-edit-header-fields doctor-list"
                              {...params}
                            />
                          )
                        }
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="modal-edit-form__input-elem">
                    <p>Жалобы:</p>
                    <TextField
                      value={complaints}
                      onChange={(e) => setInputValueEdit({
                        ...inputValueEdit,
                        complaints: e.target.value,
                      })}
                    />
                  </div>
                </div>
              </FormControl>
              <div className="modal-edit-btns header-btn">
                <Button onClick={() => handleCloseModalEdit()}>
                  Cancel
                </Button>
                <Button
                  className="modal-edit-btns__right"
                  onClick={() => editAppointment()}
                >
                  Save
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditAppointment;
