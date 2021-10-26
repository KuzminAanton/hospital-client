import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization_slice',
  initialState: {
    inputState: {
      loginValue: '',
      passwordValue: '',
      retryPasswordValue: '',
    },
  },
  reducers: {
    changeInputState(state, action) {
      switch (action.payload.flagInput) {
        case 'LOGIN':
          state.inputState = {
            ...state.inputState,
            loginValue: action.payload.text,
          };
          break;
        case 'PASSWORD':
          state.inputState = {
            ...state.inputState,
            passwordValue: action.payload.text,
          };
          break;
        case 'RETRY_PASSWORD':
          state.inputState = {
            ...state.inputState,
            retryPasswordValue: action.payload.text,
          };
          break;
        default:
          return state;
      }
    },
  },
});

export const {
  changeInputState,
  changeErrorState,
} = authorizationSlice.actions;
export default authorizationSlice.reducer;
