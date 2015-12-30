var AppDispatcher = require('../dispatcher/AppDispatcher');
var DashboardConstants = require('../constants/DashboardConstants');

var CalendarActions = {

  recieveCalendarData: function(calendarData, calendarId) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_RAW_CALENDAR_EVENTS,
      calendarData: calendarData,
      calendarId: calendarId
    });
  },

  recieveCalendarList: function(calendarList) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_RAW_CALENDAR_LIST,
      calendarList: calendarList
    });
  }

};

module.exports = CalendarActions;