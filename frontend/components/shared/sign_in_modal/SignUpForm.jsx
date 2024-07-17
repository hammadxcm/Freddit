import React from 'react';
import UserApiUtil from '../../../util/user_api_util';
import ModalActions from '../../../actions/modal_actions';

export default class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    UserApiUtil.signUpUser(this.state, () => {
      ModalActions.receiveModal(null);
    });
  }

  usernameChange(e) {
    this.setState({ username: e.currentTarget.value });
  }

  emailChange(e) {
    this.setState({ email: e.currentTarget.value });
  }

  passwordChange(e) {
    this.setState({ password: e.currentTarget.value });
  }

  passwordConfirmationChange(e) {
    this.setState({ passwordConfirmation: e.currentTarget.value });
  }

  render() {
    return (
      <div className="sign-up-form">
        <h2>Create an Account</h2>

        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input
            onChange={this.usernameChange}
            type="text"
            placeholder="username"
            value={this.state.username}
            required="true"
          />

          <label>Email</label>
            <input
              onChange={this.emailChange}
                type="text"
                placeholder="email"
                value={this.state.email}
                required="true"
              />

          <label>Password</label>
            <input
              onChange={this.passwordChange}
              type="password"
              placeholder="password"
              value={this.state.password}
              required="true"
            />

          <label>Password Confirmation</label>
            <input
              onChange={this.passwordConfirmationChange}
              type="password"
              placeholder="confirm password"
              value={this.state.password_confirmation}
              required="true"
            />
          <input  type="submit" value="Sign Up"/>
        </form>
      </div>
    );
  }

}
