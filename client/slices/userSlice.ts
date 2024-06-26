import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types';

const initialState: UserState = {
  userData: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null,
  sessionData: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userData = null;
      localStorage.clear();
    },
    updateSessionData: (state, action: PayloadAction<any>) => {
      state.sessionData.push(action.payload);
    },
  },
});
export const { setCredential, logout, updateSessionData } = userSlice.actions;
