import React from 'react';
import Sub from './Sub';

export default class SubNew extends React.Component {

  render() {
    return <Sub sort="new"
      children={this.props.children}
      params={this.props.params}
      history={this.props.history}
    />;
  }

}
