import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'react-snackbar-alert';
import store from '../store/mainStore';
import CustomSnackbarComponent from '../components/util/snackbar/Snackbar';
import './App.css';

import Main from './Main';

function AppRouter() {
  return (
    <Provider store={store}>
      <SnackbarProvider component={CustomSnackbarComponent}>
        <Main />
      </SnackbarProvider>
    </Provider>
  );
}

export default AppRouter;
