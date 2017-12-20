import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class CalendarActions {

    recieveCalendarData(calendarData, calendarId) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_RAW_CALENDAR_EVENTS,
            calendarData: calendarData,
            calendarId: calendarId
        });
    }

    recieveCalendarAuthCheckResult(authorized) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_CALENDAR_AUTH_CHECK_RESULT,
            authorized: authorized
        });
    }

    recieveCalendarList(calendarList) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_RAW_CALENDAR_LIST,
            calendarList: calendarList
        });
    }

}

export default new CalendarActions();