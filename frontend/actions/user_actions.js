import AppDispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/user_constants';

let UserActions = {
  receiveCurrentUser: function(currentUser){
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_CURRENT_USER,
      currentUser: currentUser
    });
  }
};

module.exports = UserActions;
