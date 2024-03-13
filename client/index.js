import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './slices/store.js';
import App from './App.jsx';


const rootElement = createRoot(document.getElementById('root'));
rootElement.render(
  <Provider store={store}>
    <App />
  </Provider>
);
