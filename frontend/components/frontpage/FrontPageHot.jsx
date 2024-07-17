import React from 'react';
import FrontPage from './FrontPage';

export default class FrontPageHot extends React.Component {

  render() {
    return <FrontPage sort="hot" history={this.props.history}/>;
  }

}
