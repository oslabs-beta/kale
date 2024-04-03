import {
  CreateSliceOptions,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

type UiState = {
  urlInput: string;
  nodeNameInput: string;
  isSidebarOpen: boolean;
  demoGifUrl: string;
  activeDemo: string;
};
const initialState: UiState = {
  urlInput: '',
  nodeNameInput: '',
  isSidebarOpen: false,
  demoGifUrl: './public/Assets/demo/signup.gif',
  activeDemo: '1',
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
    setGifUrl: (state, action: PayloadAction<string>) => {
      state.demoGifUrl = action.payload;
    },
    setActiveDemo: (state, action: PayloadAction<string>) => {
      state.activeDemo = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  saveUrl,
  saveNodeName,
  setGifUrl,
  setActiveDemo,
} = uiSlice.actions;
