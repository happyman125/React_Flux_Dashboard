import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class CalendarStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);

    this.calendardata = {};
    this.calendarId = "";
    this.calendarlist = [];
    this.gapi_authorized = false;
    this.auth_check_finished = false;
  }

  getCalendarData() {
    return this.calendardata;
  }

  getCalendarId() {
    return this.calendarId;
  }

  getCalendarList() {
    return this.calendarlist;
  }

  authCheckFinished() {
    return this.auth_check_finished;
  }

  areAuthorized() {
    return this.gapi_authorized;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {

      case DashboardConstants.RECIEVE_RAW_CALENDAR_EVENTS:
        console.log('Refreshing calendar events..');
        this.calendardata = action.calendarData;
        this.calendarId = action.calendarId; 
        this.__emitChange();
        break;

      case DashboardConstants.RECIEVE_RAW_CALENDAR_LIST:
        console.log('Refreshing calendar lists..');
        this.calendarlist = action.calendarList;
        this.__emitChange();
        break;

      case DashboardConstants.RECIEVE_CALENDAR_AUTH_CHECK_RESULT:
        this.auth_check_finished = true;
        this.gapi_authorized = action.authorized;

        console.log("GAPI auth check complete");

        if(action.authorized){
          console.log("GAPI successfully authorized");
        }
        else{
          console.log("GAPI NOT authorized");
        }

        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

module.exports = new CalendarStore(AppDispatcher);