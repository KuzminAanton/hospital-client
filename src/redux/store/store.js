import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from '../slice/authorizationSlice';
import headerSlice from '../slice/headerSlice';
import appointmentSlice from '../slice/appointmentSlice';

export default configureStore({
  reducer: {
    authorizationSlice,
    headerSlice,
    appointmentSlice,
  },
});
