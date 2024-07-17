import AppDispatcher from '../dispatcher/dispatcher';
import SubConstants from '../constants/sub_constants';

let SubActions = {
  receiveAll: function(subs){
    AppDispatcher.dispatch({
      actionType: SubConstants.RECEIVE_SUBS,
      subs: subs
    });
  },
  receiveSub: function (sub) {
    AppDispatcher.dispatch({
      actionType: SubConstants.RECEIVE_SUB,
      sub: sub
    });
  }
};

module.exports = SubActions;
