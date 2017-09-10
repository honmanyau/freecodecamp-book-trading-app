import React from 'react';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';



class Dashboard extends React.Component {
  render() {
    return(
      <Card>
        <CardText>
          You must update your profile before trading books:
        </CardText>
      </Card>
    )
  }
}

export default connect(null, null)(Dashboard);
