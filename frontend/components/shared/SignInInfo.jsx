import React from 'react';
import ReactDOM from 'react-dom';
import ModalActions from '../../actions/modal_actions';
import SignInModal from './sign_in_modal/SignInModal';

export default class SignInInfo extends React.Component {

  handleClick() {
    ModalActions.receiveModal(<SignInModal/>);
  }

  render() {
    return (
      <div className="user-info">
        <p>
          Want to join?
          <span className="sign-up-link" onClick={this.handleClick}> Log in </span>
          or
          <span className="sign-up-link" onClick={this.handleClick}> sign up </span>
          now.
        </p>
      </div>
    );
  }

}
