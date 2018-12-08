import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider as AlertProvider } from 'react-alert';

import './App.css';

import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

import store from './store';
import AppRouter from './AppRouter';
import AlertTemplate from './components/AlertTemplate';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: pink,
    accept: {
      main: '#8bc34a',
    },
    searchBar: {
      main: '#3f51b5',
    },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.store = store.store;
    this.persistor = store.persistor;
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AlertProvider template={AlertTemplate} position="bottom right" timeout={15000} transition="fade" >
          <Provider
            store={this.store}
            persistor={this.persistor}
          >
            <PersistGate loading={null} persistor={this.persistor}>
              <AppRouter />
            </PersistGate>
          </Provider>
        </AlertProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
