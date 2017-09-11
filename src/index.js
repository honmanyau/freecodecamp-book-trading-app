import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Auth from './components/Auth';
import Footer from './components/Footer';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';



ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Auth />

          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
