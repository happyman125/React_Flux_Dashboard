import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class NewsActions {

  recieveNewsData(newsData) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_RAW_NEWS_EVENTS,
      newsData: newsData
    });
  }

};

module.exports = new NewsActions(AppDispatcher);