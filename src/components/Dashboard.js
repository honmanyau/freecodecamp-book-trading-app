import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardText } from 'material-ui/Card';
import { cyan500 } from 'material-ui/styles/colors';

import Search from './Search';
import SearchResult from './SearchResult';


const styles = {
  link: {
    color: cyan500
  }
}

class Dashboard extends React.Component {
  render() {
    return(
      <Card>
        <CardText>You must update <Link style={styles.link} to="/profile">your profile</Link> before trading books.</CardText>
        <CardText><Search /></CardText>
        <CardText><SearchResult /></CardText>
      </Card>
    )
  }
}

export default connect(null, null)(Dashboard);
