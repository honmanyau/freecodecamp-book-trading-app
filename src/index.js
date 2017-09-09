import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Auth from './components/Auth';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

import notes from './notes';
notes();



ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Auth />

          <Switch>
            <Route exact path="/" render={() => <div>index.js (╯°□°）╯︵ ┻━┻</div>}/>
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} passedAuth={store.getState().auth} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
