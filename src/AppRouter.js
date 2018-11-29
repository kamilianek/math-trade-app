import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import EnsureLoggedInPath from './components/EnsureLoggedInPath';

import LoginView from './views/LoginView';
import MainPanelView from './views/MainPanelView';
import RegistrationView from './views/RegistrationView';
import AccountView from './views/AccountView';
import SignOutView from './views/SignOutView';
import MyProductsView from './views/MyProductsView';
import PreferencesView from './views/PreferencesView';
import DefinedGroupsView from './views/DefinedGroupsView';
import UserResultsView from './views/UserResultsView';
import ModeratorResultsView from './views/ModeratorResultsView';
import PermissionRequestsView from './views/PermissionRequestsView';


export default class AppRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <EnsureLoggedInPath exact path="/" component={MainPanelView} />
          <EnsureLoggedInPath exact path="/editions" component={MainPanelView} />
          <EnsureLoggedInPath exact path="/editions/:editionId/products" component={MyProductsView} />
          <EnsureLoggedInPath exact path="/editions/:editionId/preferences" component={PreferencesView} />
          <EnsureLoggedInPath exact path="/editions/:editionId/definedGroups" component={DefinedGroupsView} />
          <EnsureLoggedInPath exact path="/editions/:editionId/results" component={UserResultsView} />
          <EnsureLoggedInPath exact path="/editions/:editionId/moderatorPanel" component={ModeratorResultsView} />
          <EnsureLoggedInPath exact path="/account" component={AccountView} />
          <EnsureLoggedInPath exact path="/permissionRequests" component={PermissionRequestsView}/>
          <Route path="/register" component={RegistrationView} />
          <Route path="/login" component={LoginView} />
          <Route path="/signout" component={SignOutView} />
        </div>
      </HashRouter>
    );
  }
}
