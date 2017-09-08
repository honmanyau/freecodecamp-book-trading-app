import React from 'react';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

class SignIn extends React.Component {
  render() {
    return(
      <Card>
        <CardText style={styles.container}>
          <TextField
            type='text'
            hintText='E-mail address'
            floatingLabelText='E-mail address'
            floatingLabelFixed
          />

          <TextField
            type='password'
            hintText='Password'
            floatingLabelText='Password'
            floatingLabelFixed
          />

          <br />

          <RaisedButton
            primary
            label="Sign In"
          />

          <br />
          <br />

          <div>Create an account</div>
        </CardText>
      </Card>
    )
  }
}

export default SignIn;
