import AppDispatcher from '../dispatcher/dispatcher';
import ModalConstants from '../constants/modal_constants';

let ModalActions = {
  receiveModal: function(modal){
    AppDispatcher.dispatch({
      actionType: ModalConstants.RECEIVE_MODAL,
      modal: modal
    });
  }
};

module.exports = ModalActions;
