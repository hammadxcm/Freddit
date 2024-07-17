import React from 'react';
import ReactDOM from 'react-dom';
import ModalStore from '../../stores/modal_store';
import ModalActions from '../../actions/modal_actions';
import UserStore from '../../stores/user_store';
import SideSignInForm from './SideSignInForm';
import SignInModal from './sign_in_modal/SignInModal';

let getStateFromStore = function () {
      return { loggedIn: !!UserStore.currentUser() };
};

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStore();
  }

  handleClick(e) {
    if (UserStore.currentUser()) {
      this.props.history.push("/r/" + this.props.sub.title + "/submit");
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  }

  componentDidMount() {
    this.userListener = UserStore.addListener(this._userChanged.bind(this));
  }

  componentWillUnmount() {
    this.userListener.remove();
  }

  render() {
    let sub = this.props.sub,
        signInForm = this.state.loggedIn ? null : <SideSignInForm sub={sub} />;

    return (
      <div className="sidebar">
        <button className="new-post-button" onClick={this.handleClick}>Make A New Post</button>
        <input className="search" placeholder="search" />
        {signInForm}
      </div>
    );
  }

  _userChanged() {
    this.setState(getStateFromStore());
  }

}
