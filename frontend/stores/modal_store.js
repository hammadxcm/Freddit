import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher';
import modalConstants from '../constants/modal_constants';

let _modal;
const modalStore = new Store(AppDispatcher);

modalStore.modal = function () {
  return _modal;
};

modalStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case modalConstants.RECEIVE_MODAL:
      _modal = payload.modal;
      modalStore.__emitChange();
      break;
  }
};

export default modalStore;
