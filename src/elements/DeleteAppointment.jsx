import React, { useContext } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAppointmentState,
  changeAppointmentTempState,
} from '../redux/slice/appointmentSlice';
import { AuthContext } from '../AuthContext';

const DeleteAppointment = (props) => {
  const dispatch = useDispatch();
  const {
    index,
    handleOpenModal,
    handleCloseModal,
    openModal,
  } = props;
  const { token, logout } = useContext(AuthContext);
  const selectorAppointmentSlice = (state) => state.appointmentSlice;
  const { appointmentList } = useSelector(selectorAppointmentSlice);
  const {
    _id: _idList,
  } = appointmentList[index];

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
        dispatch(changeAppointmentState(data));
        dispatch(changeAppointmentTempState(data));
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          logout();
        }
      });
    handleCloseModal();
  };

  return (
    <div>
      <Button onClick={() => handleOpenModal()}>
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
              <div className="modal-edit-btns header-btn">
                <Button onClick={() => handleCloseModal()}>
                  Cancel
                </Button>
                <Button
                  className="modal-edit-btns__right"
                  onClick={() => deleteAppointment()}
                >
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

export default DeleteAppointment;
