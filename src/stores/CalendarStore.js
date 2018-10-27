import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';
import moment from 'moment';

class CalendarStore extends Store {

  constructor(dispatcher) {
    super(AppDispatcher);

    this.calendardata = {};
    this.calendarId = "";
    this.calendarlist = [];
    this.gapi_authorized = false;
    this.auth_check_finished = false;
    this.last_update_time = "Never";
  }

  //  Returns the last time the store was updated with calendar events
  getLastUpdateTime(){
    return this.last_update_time;
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
        console.log('Updating calendar store / calendar events: ', action);
        this.calendardata = action.calendarData;
        this.calendarId = action.calendarId; 
        this.last_update_time = this.last_update_time = moment().format("h:mma");
        this.__emitChange();
        break;

      case DashboardConstants.RECIEVE_RAW_CALENDAR_LIST:
        console.log('Updating calendar store / calendar list: ', action);
        this.calendarlist = action.calendarList;
        this.__emitChange();
        break;

      case DashboardConstants.RECIEVE_CALENDAR_AUTH_CHECK_RESULT:
        console.log('Updating calendar store / auth result: ', action);
        this.auth_check_finished = true;
        this.gapi_authorized = action.authorized;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new CalendarStore();