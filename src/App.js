import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './App.css';
import store from './store';
import AppRouter from './AppRouter';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = store.store;
    this.persistor = store.persistor;
  }

  render() {
    return (
      <Provider
        store={this.store}
        persistor={this.persistor}
      >
        <PersistGate loading={null} persistor={this.persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
