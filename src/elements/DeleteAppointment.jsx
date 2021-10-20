import React from 'react';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
} from '@mui/material';

const DeleteAppointment = (props) => {
  const {
    handleOpenModal,
    handleCloseModal,
    openModal,
    deleteAppointment,
  } = props;

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
