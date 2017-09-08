import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Auth from './components/Auth';

import notes from './notes';
notes();



ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Auth />

          <Route exact path="/" render={() => <div>index.js (╯°□°）╯︵ ┻━┻</div>}/>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
