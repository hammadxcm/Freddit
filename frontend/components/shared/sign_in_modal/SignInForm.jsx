import React from 'react';
import ReactDOM from 'react-dom';
import UserApiUtil from '../../../util/user_api_util';
import ModalActions from '../../../actions/modal_actions';

export default class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.usernameInput).focus();
  }

  handleSubmit(e) {
    e.preventDefault();
    UserApiUtil.signInUser(this.state);
    ModalActions.receiveModal(null);
  }

  usernameChange(e) {
    this.setState({ username: e.currentTarget.value });
  }

  passwordChange(e) {
    this.setState({ password: e.currentTarget.value });
  }

  render() {
    return (
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
            <input
              onChange={this.usernameChange}
              ref="usernameInput"
              type="text"
              placeholder="email"
              required="true"
              value={this.state.username}/>

          <label>Password</label>
            <input
              onChange={this.passwordChange}
              type="password"
              placeholder="password"
              value={this.state.password}
              required="true"/>
          <input  type="submit" value="Sign In"/>
        </form>
      </div>
    );
  }

}
