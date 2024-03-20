import {
  CreateSliceOptions,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

type UiState = {
  urlInput: string;
  isSidebarOpen: boolean;
  isInputOpen: boolean;
};
const initialState: UiState = {
  urlInput: '',
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
    saveUrl: (state, action: PayloadAction<string>) => {
      state.urlInput = action.payload;
    },
  },
});

export const { toggleSidebar, showInput, saveUrl } = uiSlice.actions;
