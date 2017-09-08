import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    return window.location.href = "/";
  }

  render() {
    return(
      <div>
        <AppBar
          title='Lesen'
          iconElementRight={<FlatButton label='Sign in' />}
          onTitleTouchTap={() => this.home()}
          onLeftIconButtonTouchTap={() => this.setState({drawerOpened: true})}
          onRightIconButtonTouchTap={() => this.props.history.push('/signin')}
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
  }
}

export default withRouter(connect(mapStateToprops, null)(Auth));
