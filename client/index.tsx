import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './slices/store';
import App from './App';

const rootElement = createRoot(document.getElementById('root'));
rootElement.render(
  <Provider store={store}>
    <App />
  </Provider>
);
