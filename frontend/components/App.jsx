import React from 'react';
import UserStore from '../stores/user_store';
import ModalStore from '../stores/modal_store';
import UserApiUtil from '../util/user_api_util';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { modal: null };
  }

  componentDidMount() {
    if (!UserStore.currentUser()) {
      UserApiUtil.fetchCurrentUser();
    }

    this.modalListener = ModalStore.addListener(this._modalChanged);
  }

  componentWillUnMount() {
    this.modalListener.remove();
  }

  render() {
    return (
      <div>
        {this.state.modal}
        {this.props.children}
      </div>
    );
  }

  _modalChanged() {
    this.setState({ modal: ModalStore.modal() });
  }

}
