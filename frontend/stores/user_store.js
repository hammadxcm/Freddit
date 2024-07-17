import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/user_constants';

const userStore = new Store(AppDispatcher);
let _currentUser = null,
    _users = [];

userStore.all = () => _users.slice();

userStore.currentUser = () =>  _currentUser;

userStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.RECEIVE_CURRENT_USER:
      _currentUser = payload.currentUser;
      userStore.__emitChange();
      break;
  }
};

export default userStore;
