import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BooksActions from '../actions/books';

import { cyan500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';



const styles = {
  textFieldStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  attributionStyles: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '9pt',
    color: '#777'
  },
  link: {
    color: cyan500
  },
  center: {
    textAlign: 'center'
  },
  hintStyle: {
    width: '100%'
  }
}


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ''
    };
  }

  handleSearchTextFieldKeyPress(event) {

  }

  render() {
    return(
      <div style={styles.textFieldStyles}>
        <TextField
          id="book-search"
          disabled={this.props.auth.inProgress ? true : false}
          inputStyle={styles.center}
          hintStyle={{...styles.center, ...styles.hintStyle}}
          errorStyle={styles.center}
          type='text'
          value={this.state.searchString}
          hintText="Search for books"
          onChange={event => this.setState({searchString: event.target.value})}
          onKeyPress={event => this.handleSearchTextFieldKeyPress(event)}
        />

        <div style={styles.attributionStyles}>
          Search results powdered by the&nbsp;<a style={styles.link} href="https://developers.google.com/books/">Google Books API</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(BooksActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
