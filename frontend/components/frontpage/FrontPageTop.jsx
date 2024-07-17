import React from 'react';
import FrontPage from './FrontPage';

export default class FrontPageTop extends React.Component {

  render() {
    return <FrontPage sort="top" history={this.props.history}/>;
  }

}
