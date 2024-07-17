import React from 'react';
import ReactDOM from 'react-dom';
import UserApiUtil from '../../util/user_api_util';
import ModalActions from '../../actions/modal_actions';

export default class SideSignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleSubmit(e) {
    e.preventDefault();

    var data = {
      username: this.state.username,
      password: this.state.password,
    };
    UserApiUtil.signInUser(data);
  }

  usernameChange(e) {
    this.setState({username: e.currentTarget.value});
  }

  passwordChange(e) {
    this.setState({password: e.currentTarget.value});
  }

  render() {
    return (
      <div className="side-sign-in-form">
        <form onSubmit={this.handleSubmit}>
          <div className="flex-container">
            <label>Email</label>
              <input
                onChange={this.usernameChange}
                type="text"
                placeholder="email"
                required="true"
                value={this.state.username}/>

            <label>Password</label>
              <input
                onChange={this.passwordChange}
                type="password"
                placeholder="password"
                required="true"
                value={this.state.password}/>
          </div>
          <input className="side-login-button" type="submit" value="Sign In"/>
        </form>
      </div>
    );
  }

}
