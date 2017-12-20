import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class NewsActions {

    recieveNewsData(newsData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_RAW_NEWS_EVENTS,
            newsData: newsData
        });
    }

};

export default new NewsActions();