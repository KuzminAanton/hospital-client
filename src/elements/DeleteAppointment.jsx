import React from 'react';
import {
  Backdrop, Box, Button, Fade, Modal,
} from '@mui/material';

const DeleteAppointment = (props) => {
  const {
    handleOpenModal,
    handleCloseModal,
    openModal,
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
          <Box className="modal-ed" />
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteAppointment;
