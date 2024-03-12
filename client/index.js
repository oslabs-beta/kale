import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './slices/store.js';

const rootElement = createRoot(document.getElementById('root'));
rootElement.render(
  <Provider store={store}>
    <App />
  </Provider>
);
