import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardText } from 'material-ui/Card';
import { cyan500 } from 'material-ui/styles/colors';

import Search from './Search';


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
        <Search />
      </Card>
    )
  }
}

export default connect(null, null)(Dashboard);
