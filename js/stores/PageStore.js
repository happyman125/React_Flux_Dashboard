var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DashboardConstants = require('../constants/DashboardConstants');
var CHANGE_EVENT = 'page-change';

//  The page components
var DashboardHome = require('../components/DashboardHome.react');
var DashboardSettings = require('../components/DashboardSettings.react');

//  Set to 'home' initially
var _currentPage = DashboardHome;

/**
 * Sets the current page
 * @param {[type]} page [description]
 */
function setPage(page) {
  _currentPage = page;
}

var PageStore = assign({}, EventEmitter.prototype, {

  getPage: function() {
    return _currentPage;
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
    case DashboardConstants.SHOW_SETTINGS:      
      console.log('Loading settings page...');
      setPage(DashboardSettings);
      PageStore.emitChange();
      break;

    case DashboardConstants.SHOW_HOME:      
      console.log('Loading home page...');
      setPage(DashboardHome);
      PageStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = PageStore;