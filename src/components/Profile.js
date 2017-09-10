import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  link: {
    color: 'black'
  },
  errorMessage: {
    color: 'red'
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityError: null,
      state: '',
      stateError: null,
      password: '',
      passwordError: null,
      passwordConfirmation: '',
      passwordConfirmationError: null
    };
  }

  handleProfileUpdateButtonEnterKeypress(event) {
    if (event.key === 'Enter') {
      this.handleProfileUpdateFormSubmission();
    }
  }

  handlePasswordUpdateTextFieldEnterKeypress(event) {
    if (event.key === 'Enter') {
      this.handlePasswordUpdateFormSubmission();
    }
  }

  handleProfileUpdateFormSubmission() {
    const city = this.state.city;
    const state = this.state.state;
    let cityError = null;
    let stateError = null;

    if (!city) {
      cityError = 'City must not be empty.';
    }

    if (!state) {
        stateError = 'State must not be empty.';
    }

    this.setState({
      cityError,
      stateError
    });

    if (!cityError, !stateError) {
      this.props.actions.updateProfile(this.props.auth.user.uid, {
        city: this.state.city,
        state: this.state.state
      });
    }
  }

  handlePasswordUpdateFormSubmission() {
    const password = this.state.password;
    const passwordConfirmation = this.state.passwordConfirmation;
    let passwordError = null;
    let passwordConfirmationError = null;

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
      passwordError,
      passwordConfirmationError
    });

    if (!passwordError && !passwordConfirmation) {
      this.props.actions.updatePassword(this.props.auth.user.uid, this.state.password);
    }
  }

  render() {
    const auth = this.props.auth;

    return(
      <Card>
        <CardText style={styles.container}>
          <TextField
            type='text'
            value={this.state.city}
            hintText='City'
            errorText={this.state.cityError}
            floatingLabelText='City'
            floatingLabelFixed
            onChange={(event) => this.setState({city: event.target.value})}
            onKeyPress={(event) => this.handleProfileUpdateButtonEnterKeypress(event)}
          />

          <TextField
            type='text'
            value={this.state.state}
            hintText='State'
            errorText={this.state.stateError}
            floatingLabelText='State'
            floatingLabelFixed
            onChange={(event) => this.setState({state: event.target.value})}
            onKeyPress={(event) => this.handleProfileUpdateButtonEnterKeypress(event)}
          />

          <br />
          <br />

          <RaisedButton
            primary
            disabled={auth.inProgress ? true : false}
            label="Update Profile"
            onClick={() => this.handleProfileUpdateFormSubmission()}
          />

          <br />
          {auth.signInError ? <div style={styles.errorMessage}>{auth.signInError}</div> : <br />}
          <br />

          <TextField
            type='password'
            value={this.state.password}
            hintText='Password'
            errorText={this.state.passwordError}
            floatingLabelText='Password'
            floatingLabelFixed
            onChange={(event) => this.setState({password: event.target.value})}
            onKeyPress={(event) => this.handlePasswordUpdateButtonEnterKeypress(event)}
          />

          <TextField
            type='password'
            value={this.state.passwordConfirmation}
            hintText='Confirm Password'
            errorText={this.state.passwordConfirmationError}
            floatingLabelText='Confirm Password'
            floatingLabelFixed
            onChange={(event) => this.setState({passwordConfirmation: event.target.value})}
            onKeyPress={(event) => this.handlePasswordUpdateButtonEnterKeypress(event)}
          />

          <br />
          <br />

          <RaisedButton
            primary
            disabled={auth.inProgress ? true : false}
            label="Update Password"
            onClick={() => this.handlePassworUpdateFormSubmission()}
          />

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
