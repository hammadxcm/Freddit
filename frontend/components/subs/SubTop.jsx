import React from 'react';
import Sub from './Sub';

export default class SubTop extends React.Component {

  render() {
    return <Sub sort="top"
      children={this.props.children}
      params={this.props.params}
      history={this.props.history}
    />;
  }

}
