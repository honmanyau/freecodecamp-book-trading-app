import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

  home() {
    // Refresh behaviour intended
    window.location.href = "/";
  }

  signOut() {
    this.props.signOut();
    window.location.href = "/";
  }

  render() {
    const auth = this.props.auth;

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
          <MenuItem onClick={() => this.home()}>Home</MenuItem>
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
