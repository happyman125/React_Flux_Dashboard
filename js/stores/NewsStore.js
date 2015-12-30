import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class NewsStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);

    this.newsdata = [];
  }

  getBreakingNews() {
    return this.newsdata;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {

      case DashboardConstants.RECIEVE_RAW_NEWS_EVENTS:
        console.log('Updating news store: ', action);
        this.newsdata = action.newsData;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

module.exports = new NewsStore(AppDispatcher);