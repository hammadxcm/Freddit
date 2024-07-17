import React from 'react';
import ModalActions from '../../actions/modal_actions';
import UserStore from '../../stores/user_store';
import SignInModal from '../shared/sign_in_modal/SignInModal';
import SignInInfo from '../shared/SignInInfo';
import CurrentUserInfo from '../shared/CurrentUserInfo';

export default class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { currentUser: UserStore.currentUser() };
  }

  handleClick() {
    ModalActions.receiveModal(<SignInModal/>);
  }

  componentDidMount() {
    this.userListener = UserStore.addListener(this._usersChanged.bind(this));
  }

  componentWillUnmount() {
    this.userListener.remove();
  }

  render() {
    let content;
    if (this.state.currentUser) {
      return <CurrentUserInfo/>;
    } else {
      return <SignInInfo/>;
    }
  }

  _usersChanged() {
    this.setState({ currentUser: UserStore.currentUser() });
  }

}
