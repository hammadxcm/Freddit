import userActions from '../actions/user_actions';

const userApiUtil = {
  fetchCurrentUser: function(cb){
    $.ajax({
      method: "GET",
      url: "/api/session",
      success: currentUser => {
        userActions.receiveCurrentUser(currentUser);
        cb && cb();
      }
    });
  },

  signOutUser: function () {
    $.ajax({
      method: "DELETE",
      url: "/api/session",
      success: currentUser => {
        userActions.receiveCurrentUser(null);
      },
    });
  },

  signUpUser: function (data, cb) {
    $.ajax({
      method: "POST",
      data: {user: data},
      url: "/api/users",
      success: currentUser => {
        userActions.receiveCurrentUser(currentUser);
        cb && cb();
      },
    });
  },

  signInUser: function(data){
    $.ajax({
      method: "POST",
      url: "/api/session",
      data: {user: data},
      success: currentUser => {
        userActions.receiveCurrentUser(currentUser);
      },
      error: function () {
        debugger
      }
    });
  }

};

export default userApiUtil;
