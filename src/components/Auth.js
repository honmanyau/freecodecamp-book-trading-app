import React from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';



class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpened: false
    };
  }

  render() {
    return(
      <div>
        <AppBar
          title='Lesen'
          iconElementRight={<FlatButton label='Sign in' />}
          onLeftIconButtonTouchTap={() => this.setState({drawerOpened: true})}
        />

        <Drawer
          docked={false}
          open={this.state.drawerOpened}
          onRequestChange={(drawerOpened) => this.setState({drawerOpened})}
        />
      </div>
    )
  }
}

export default Auth;
