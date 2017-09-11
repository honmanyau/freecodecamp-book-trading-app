import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardText, CardTitle } from 'material-ui/Card';
import { cyan500 } from 'material-ui/styles/colors';

import Collection from './Collection';
import Search from './Search';
import SearchResult from './SearchResult';



const styles = {
  link: {
    color: cyan500
  }
}

class Dashboard extends React.Component {
  render() {
    const auth = this.props.auth;

    return(
      <Card>
        {
          !auth.inProgress && auth.profile ?
            <span>
              <CardTitle title="My Collection" />
              <CardText><Collection /></CardText>
            </span>
            :
            <CardText>You must update <Link style={styles.link} to="/profile">your profile</Link> before trading books.</CardText>
        }
        <CardText><Search /></CardText>
        <CardText><SearchResult /></CardText>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    books: state.books
  }
}

export default connect(mapStateToProps, null)(Dashboard);
