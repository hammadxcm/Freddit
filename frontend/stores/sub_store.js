import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher';
import SubConstants from '../constants/sub_constants';

let _subs = [];
const subStore = new Store(AppDispatcher);

let addSub = function (newSub) {
  let replaced = false;
  _subs.forEach(function (sub, idx) {
    if (sub.id == newSub.id) {
      _subs[idx] = newSub;
      replaced = true;
    }
  });

  if (!replaced) {
    _subs.push(newSub);
  }
};

subStore.all = function () {
  return _subs.slice();
};

subStore.findByName = function (subName) {
  return _subs.find(function(sub) {
    return sub.title == subName;
  });
};

subStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SubConstants.RECEIVE_SUBS:
      _subs = payload.subs;
      subStore.__emitChange();
      break;
    case SubConstants.RECEIVE_SUB:
      addSub(payload.sub);
      subStore.__emitChange();
      break;
  }
};

export default subStore;
