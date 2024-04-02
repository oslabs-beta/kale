import {
  CreateSliceOptions,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

type UiState = {
  urlInput: string;
  nodeNameInput: string;
  isSidebarOpen: boolean;
};
const initialState: UiState = {
  urlInput: '',
  nodeNameInput: '',
  isSidebarOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    saveUrl: (state, action: PayloadAction<string>) => {
      state.urlInput = action.payload;
    },
    saveNodeName: (state, action: PayloadAction<string>) => {
      state.nodeNameInput = action.payload;
    },
  },
});

export const { toggleSidebar, saveUrl, saveNodeName } = uiSlice.actions;
