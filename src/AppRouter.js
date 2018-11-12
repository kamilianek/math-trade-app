import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import EnsureLoggedInPath from './components/EnsureLoggedInPath';

import LoginView from './views/LoginView';
import MainPanelView from './views/MainPanelView';
import RegistrationView from './views/RegistrationView';
import SecondPanel from './views/SecondPanelView';
import SignOutView from './views/SignOutView';
import MyProductsView from './views/MyProductsView';
import PreferencesView from './views/PreferencesView';


export default class AppRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <EnsureLoggedInPath exact path="/" component={MainPanelView} />
          <EnsureLoggedInPath exact path="/editions" component={MainPanelView} />
          <EnsureLoggedInPath exact path="/editions/:editionId/products" component={MyProductsView} />
          <EnsureLoggedInPath exact path="/editions/:editionId/preferences" component={PreferencesView}/>
          <EnsureLoggedInPath exact path="/account" component={SecondPanel}/>
          <Route path="/register" component={RegistrationView}/>
          <Route path="/login" component={LoginView}/>
          <Route path="/signout" component={SignOutView} />
        </div>
      </HashRouter>
    );
  }
}
