import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'header_slice',
  initialState: {
    headerState: {
      text: '',
      checkBtn: false,
    },
  },
  reducers: {
    changeHeaderState(state, action) {
      state.headerState = action.payload;
    },
  },
});

export const { changeHeaderState } = headerSlice.actions;
export default headerSlice.reducer;
