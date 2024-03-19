import { CreateSliceOptions, createSlice } from '@reduxjs/toolkit';

type UiState = {
  isSidebarOpen: boolean;
  isInputOpen: boolean;
};
const initialState: UiState = {
  isSidebarOpen: false,
  isInputOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    showInput(state) {
      state.isInputOpen = true;
    },
  },
});

export const { toggleSidebar, showInput } = uiSlice.actions;
