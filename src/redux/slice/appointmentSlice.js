import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment_slice',
  initialState: {
    appointmentList: [],
    appointmentListTemp: [],
    doctorsList: [],
  },
  reducers: {
    changeAppointmentState(state, action) {
      state.appointmentList = action.payload;
    },
    changeAppointmentTempState(state, action) {
      state.appointmentListTemp = action.payload;
    },
    changeDoctorList(state, action) {
      state.doctorsList = action.payload;
    },
  },
});

export const {
  changeAppointmentState,
  changeAppointmentTempState,
  changeDoctorList,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
