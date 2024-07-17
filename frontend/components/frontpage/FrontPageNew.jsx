import React from 'react';
import FrontPage from './FrontPage';

export default class FrontPageNew extends React.Component {

  render() {
    return <FrontPage sort="new" history={this.props.history}/>;
  }

}
