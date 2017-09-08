import React from 'react';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';



class Dashboard extends React.Component {
  render() {
    console.log("DASHBOARD")
    return(
      <Card>
        <CardText>Dashboard.js (╯°□°）╯︵ ┻━┻</CardText>
      </Card>
    )
  }
}

export default connect(null, null)(Dashboard);
