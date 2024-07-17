import React from 'react';
import Sub from './Sub';

export default class SubHot extends React.Component {

  render() {
    return <Sub sort="hot"
      children={this.props.children}
      params={this.props.params}
      history={this.props.history}
    />;
  }

}
