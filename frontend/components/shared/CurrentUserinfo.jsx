import React from 'react';
import ReactDOM from 'react-dom';
import UserStore from '../../stores/user_store';
import UserApiUtil from '../../util/user_api_util';

export default class CurrentUserInfo extends React.Component {

  handleClick() {
    ModalActions.receiveModal(<SignInModal/>);
  }

  logOut() {
    UserApiUtil.signOutUser();
  }

  render() {
    let user = UserStore.currentUser();

    return (
      <div className="user-info">
        <p>
          {user.username + " "}
          <button
            className="clickable"
            onClick={this.logOut}>Sign Out</button>
        </p>
      </div>
    );
  }

}
