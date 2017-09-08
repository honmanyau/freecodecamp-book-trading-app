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

  handleSignInButtonClick() {
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
          />

          <TextField
            type='password'
            value={this.state.password}
            hintText='Password'
            errorText={this.state.passwordError}
            floatingLabelText='Password'
            floatingLabelFixed
            onChange={(event) => this.setState({password: event.target.value})}
          />

          <br />
          <br />

          <RaisedButton
            primary
            disabled={auth.inProgress ? true : false}
            label="Sign In"
            onClick={() => this.handleSignInButtonClick()}
          />

          <br />
          {auth.signInError ? <div style={styles.errorMessage}>{auth.signInError}</div> : <br />}
          <br />

          <div>Create an account</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
