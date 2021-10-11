import React, { useContext, useEffect, useState } from 'react';
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
import './ModalWindows.scss';
import { AuthContext } from '../AuthContext';

const ModalWindow = (props) => {
  const {
    doctorsList,
    appointmentList,
    setAppointmentList,
    valueInputAdd,
    index,
    typeModal,
    logout,
  } = props;
  const { token } = useContext(AuthContext);
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
      if (!res.data.error) {
        setAppointmentList(res.data.data);
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
        setAppointmentList([...res.data.data]);
      }
    });
    handleCloseModal();
  };

  if (typeModal === 'edit') {
    return (
      <div>
        <Button onClick={handleOpenModal}>
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
                        value={inputValueEdit.name}
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
                        value={inputValueEdit.doctor}
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
                      <TextField
                        type="date"
                        value={inputValueEdit.date}
                        onChange={(e) => setInputValueEdit({
                          ...inputValueEdit,
                          date: e.target.value,
                        })}
                      />
                    </div>
                    <div className="modal-edit-form__input-elem">
                      <p>Жалобы:</p>
                      <TextField
                        value={inputValueEdit.complaints}
                        onChange={(e) => setInputValueEdit({
                          ...inputValueEdit,
                          complaints: e.target.value,
                        })}
                      />
                    </div>
                  </div>
                </FormControl>
                <div className="modal-edit-btns">
                  <Button onClick={() => handleCloseModal()}>
                    Cancel
                  </Button>
                  <Button onClick={() => editAppointment()}>
                    Save
                  </Button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={handleOpenModal}>
        <img src="../images/icon-delete.svg" alt="img" />
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
            <div className="modal-del">
              <div className="modal-del-title">
                <h3>Удалить прием</h3>
              </div>
              <div className="modal-del-text">
                <p>Вы действительно хотите удалить прием?</p>
              </div>
              <div className="modal-edit-btns">
                <Button onClick={() => handleCloseModal()}>
                  Cancel
                </Button>
                <Button onClick={() => deleteAppointment()}>
                  Delete
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
