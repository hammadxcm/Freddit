import React from 'react';
import FrontPage from './FrontPage';

export default class FrontPageControversial extends React.Component {

  render() {
    return <FrontPage sort="controversial" history={this.props.history}/>;
  }

}
