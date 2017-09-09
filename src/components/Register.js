import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as AuthActions from '../actions/auth';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  errorMessage: {
    color: 'red'
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      usernameError: null,
      email: '',
      emailError: null,
      password: '',
      passwordError: null,
      passwordConfirmation: '',
      passwordConfirmationError: null
    };
  }

  handleSignInFormSubmission(event) {
    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;
    const passwordConfirmation = this.state.passwordConfirmation;
    let emailError = null;
    let usernameError = null;
    let passwordError = null;
    let passwordConfirmationError = null;

    if (!email) {
      emailError = 'Please enter an e-mail address.';
    }
    else if (!email.match(/.+?@.+?\..+/)) {
      emailError = 'Please enter a valid e-mail address.';
    }

    if (!username) {
      usernameError = 'Please enter a username.';
    }
    else if (username.length < 3) {
      usernameError = 'Your username must contain at least 3 characters.';
    }

    if (!password) {
        passwordError = 'Please enter a password.';
    }
    else if (password.length < 6) {
        passwordError = 'Your password must contain at least 6 characters.';
    }
    else if (password !== passwordConfirmation) {
      passwordError = 'Passwords do not match';
    }

    if (!password) {
        passwordConfirmationError = 'Please enter a password.';
    }
    else if (password.length < 6) {
        passwordConfirmationError = 'Your password must contain at least 6 characters.';
    }
    else if (password !== passwordConfirmation) {
      passwordConfirmationError = 'Passwords do not match';
    }

    this.setState({
      usernameError,
      emailError,
      passwordError,
      passwordConfirmationError
    });

    this.props.actions.register(email, password, username);
  }

  handleTextFieldEnterKeypress(event) {
    if (event.key === 'Enter') {
      this.handleSignInFormSubmission();
    }
  }

  render() {
    const auth = this.props.auth;

    return(
      <Card>
        <CardText style={styles.container}>
          <TextField
            type='text'
            value={this.state.email}
            hintText='E-mail address'
            errorText={this.state.emailError}
            floatingLabelText='E-mail address'
            floatingLabelFixed
            onChange={(event) => this.setState({email: event.target.value})}
            onKeyPress={(event) => this.handleTextFieldEnterKeypress(event)}
          />

          <TextField
            type='text'
            value={this.state.username}
            hintText='Username'
            errorText={this.state.usernameError}
            floatingLabelText='E-mail address'
            floatingLabelFixed
            onChange={(event) => this.setState({username: event.target.value})}
            onKeyPress={(event) => this.handleTextFieldEnterKeypress(event)}
          />

          <TextField
            type='password'
            value={this.state.password}
            hintText='Password'
            errorText={this.state.passwordError}
            floatingLabelText='Password'
            floatingLabelFixed
            onChange={(event) => this.setState({password: event.target.value})}
            onKeyPress={(event) => this.handleTextFieldEnterKeypress(event)}
          />

          <TextField
            type='password'
            value={this.state.passwordConfirmation}
            hintText='Confirm Password'
            errorText={this.state.passwordConfirmationError}
            floatingLabelText='Confirm Password'
            floatingLabelFixed
            onChange={(event) => this.setState({passwordConfirmation: event.target.value})}
            onKeyPress={(event) => this.handleTextFieldEnterKeypress(event)}
          />

          <br />
          <br />

          <RaisedButton
            primary
            disabled={auth.inProgress ? true : false}
            label="Register"
            onClick={() => this.handleSignInFormSubmission()}
          />

          <br />
          {auth.signInError ? <div style={styles.errorMessage}>{auth.registrationError}</div> : <br />}
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
