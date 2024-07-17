import React from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ModalActions from '../../../actions/modal_actions';

export default class SignInModal extends React.Component {

  removeModal() {
    ModalActions.receiveModal(null);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div onClick={this.removeModal} className="modal">
        <div onClick={this.stopPropagation} className="modal-content">
          <button onClick={this.removeModal} className="exit-modal">
            x
          </button>
          <SignUpForm/>
          <SignInForm/>
        </div>
      </div>
    );
  }

}
