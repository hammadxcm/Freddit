import React from 'react';
import Sub from './Sub';

export default class SubControversial extends React.Component {

  render() {
    return <Sub sort="controversial"
      children={this.props.children}
      params={this.props.params}
      history={this.props.history}
    />;
  }

}
