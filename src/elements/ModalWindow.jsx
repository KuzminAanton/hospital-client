import React, {
  useState,
} from 'react';
import EditAppointment from './EditAppointment';
import DeleteAppointment from './DeleteAppointment';
import './ModalWindows.scss';

const ModalWindow = (props) => {
  const {
    index,
    typeModal,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      {
        typeModal === 'edit'
          ? (
            <EditAppointment
              index={index}
              openModal={openModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
            />
          )
          : (
            <DeleteAppointment
              index={index}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              openModal={openModal}
            />
          )
      }
    </>
  );
};

export default ModalWindow;
