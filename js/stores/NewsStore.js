var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DashboardConstants = require('../constants/DashboardConstants');
var CHANGE_EVENT = 'news-change';

var _newsdata = [];

function setNewsData(newsdata) {
  _newsdata = newsdata;
}

var NewsStore = assign({}, EventEmitter.prototype, {

  getBreakingNews: function() {
    return _newsdata;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  
  switch(action.actionType) {
    case DashboardConstants.RECIEVE_RAW_NEWS_EVENTS:      
      newsdata = action.newsData;
      console.log('Refreshing news info..');
      setNewsData(newsdata);
      NewsStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = NewsStore;