import React from 'react';
import { Backdrop, Box, Button, Fade, FormControl, MenuItem, Modal, Select, TextField } from "@mui/material";

const EditAppointment = (props) => {
  const {
    doctorsList,
    openModal,
    handleOpenModal,
    handleCloseModal,
    inputValueEdit,
    setInputValueEdit,
    editAppointment
  } =props;


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
};

export default EditAppointment;
