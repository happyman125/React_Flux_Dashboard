import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class CalendarStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);

    this.calendardata = {};
    this.calendarId = "";
  }

  getCalendarData() {
    return this.calendardata;
  }

  getCalendarId() {
    return this.calendarId;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {

      case DashboardConstants.RECIEVE_RAW_CALENDAR_EVENTS:
        console.log('Refreshing calendar info..');
        this.calendardata = action.calendarData;
        this.calendarId = action.calendarId;        
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

module.exports = new CalendarStore(AppDispatcher);