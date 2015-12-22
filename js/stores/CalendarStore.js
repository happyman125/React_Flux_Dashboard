var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DashboardConstants = require('../constants/DashboardConstants');
var CHANGE_EVENT = 'calendar-change';

var _calendardata = {};
var _calendarId = "";

function setCalendarData(calendardata, calendarid) {
  _calendardata = calendardata;
  _calendarId = calendarid;
}

var CalendarStore = assign({}, EventEmitter.prototype, {

  getCalendarData: function() {
    return _calendardata;
  },

  getCalendarId: function(){
    return _calendarId;
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
    case DashboardConstants.RECIEVE_RAW_CALENDAR_EVENTS:      
      var calendarData = action.calendarData;
      var calendarId = action.calendarId;
      console.log('Refreshing calendar info..');
      setCalendarData(calendarData, calendarId);
      CalendarStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = CalendarStore;