import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';

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

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: null,
      password: '',
      passwordError: null
    };
  }

  handleTextFieldEnterKeypress(event) {
    if (event.key === 'Enter') {
      this.handleSignInFormSubmission();
    }
  }

  handleSignInFormSubmission() {
    const email = this.state.email;
    const password = this.state.password;

    if (!email.match(/.+?@.+?\..+/)) {
      this.setState({
        emailError: 'Please enter a valid e-mail address.'
      });
    }
    else {
      this.setState({
        emailError: null
      });
    }


    if (!password) {
      this.setState({
        passwordError: 'Please enter a password.'
      });
    }
    else if (password.length < 6) {
      this.setState({
        passwordError: 'Please enter a valid password.'
      });
    }
    else {
      this.setState({
        passwordError: null
      });
    }

    this.props.actions.signIn(email, password);
  }

  render() {
    const auth = this.props.auth;

    if (!auth.inProgress && auth.user) {
      return <Redirect to="/" />;
    }
    else if (!auth.inProgress) {
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
              type='password'
              value={this.state.password}
              hintText='Password'
              errorText={this.state.passwordError}
              floatingLabelText='Password'
              floatingLabelFixed
              onChange={(event) => this.setState({password: event.target.value})}
              onKeyPress={(event) => this.handleTextFieldEnterKeypress(event)}
            />

            <br />
            <br />

            <RaisedButton
              primary
              disabled={auth.inProgress ? true : false}
              label="Sign In"
              onClick={() => this.handleSignInFormSubmission()}
            />

            <br />
            {auth.signInError ? <div style={styles.errorMessage}>{auth.signInError}</div> : <br />}
            <br />

            <div>Create an account</div>
          </CardText>
        </Card>
      )
    }

    return <Card style={styles.container}><CardText>Please wait.  (╯°□°）╯︵ ┻━┻</CardText></Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
