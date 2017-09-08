import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { Card, CardText } from 'material-ui/Card';



const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

class PrivateRoute extends React.Component {
  render() {
    const {component: Component, passedAuth, ...rest} = this.props;

    if (!passedAuth.inProgress) {
      return(
        <Route
          {...rest}
          render={(props) => passedAuth.user ? <Component {...props} /> : <Redirect to="/" />}
        />
      );
    }
    else {
      return <Card><CardText style={styles.container}>Please sign in! (╯°□°）╯︵ ┻━┻</CardText></Card>;
    }
  }
}

export default PrivateRoute;
