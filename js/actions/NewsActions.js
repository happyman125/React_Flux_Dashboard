var AppDispatcher = require('../dispatcher/AppDispatcher');
var DashboardConstants = require('../constants/DashboardConstants');

var NewsActions = {

  recieveNewsData: function(newsData) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_RAW_NEWS_EVENTS,
      newsData: newsData
    });
  },

};

module.exports = NewsActions;