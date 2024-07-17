import React from 'react';
import SubList from '../subs/SubList';
import UserInfo from './UserInfo';

export default class NavBar extends React.Component {
  render() {
    let subName = this.props.subName || "All",
        style;

    if (this.props.imageUrl) {
      style = {
        backgroundImage: 'url(' + this.props.imageUrl + ')'
      };
    }

    // debugger

    return (
      <div className="nav-bar" style={style}>
        <SubList subName={this.props.subName}/>
        <div className="logo-container">
          <a className="logo-image"href="/#/"></a>
          <h1 className="logo"><a href="/#/">freddit</a></h1>
        </div>
        <h3 className="sub-name">
          <a href={"/#/r/" + subName}>{subName}</a>
        </h3>
        {this.props.tabs}
        <UserInfo/>
      </div>
    );
  }

}
