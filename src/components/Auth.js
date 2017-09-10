import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { signOut } from '../actions/auth';

import * as common from '../common';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';



class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpened: false
    };
  }

  signOut() {
    this.props.signOut();
    this.props.history.push('/');
  }

  render() {
    const auth = this.props.auth;
    const pathname = this.props.location.pathname;

    if (!auth.inProgress && auth.user && (pathname === '/signin' || pathname === '/register')) {
      return <Redirect to="/dashboard" />
    }

    if (!auth.inProgress && !auth.user && (pathname === '/dashboard')) {
      return window.location.href = "/";
    }

    return(
      <div>
        <AppBar
          title='Lesen'
          iconElementRight={
            <FlatButton
              disabled={auth.inProgress ? true : false}
              label={auth.inProgress ? 'Loading (╯°□°）╯︵ ┻━┻' : (auth.user ? 'Sign out' : 'Sign in')}
              onClick={() => auth.user ? this.signOut() : this.props.history.push('/signin')}
            />}
          onTitleTouchTap={() => this.home()}
          onLeftIconButtonTouchTap={() => this.setState({drawerOpened: true})}
        />

        <Drawer
          docked={false}
          open={this.state.drawerOpened}
          onRequestChange={(drawerOpened) => this.setState({drawerOpened})}
        >
          <MenuItem onClick={() => this.props.history.push('/')}>Home</MenuItem>
          <MenuItem onClick={() => this.props.history.push('/dashboard')}>Dashboard</MenuItem>
          <MenuItem onClick={() => this.props.history.push('/profile')}>Profile</MenuItem>
          <MenuItem onClick={() => window.open(common.gitHubRepositoryURL)}>GitHub Repository</MenuItem>
        </Drawer>
      </div>
    )
  }
}

const mapStateToprops = (state) => {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default withRouter(connect(mapStateToprops, mapDispatchToProps)(Auth));
