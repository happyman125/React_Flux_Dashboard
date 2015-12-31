import moment from 'moment';

//  Actions
import CalendarActions from '../actions/CalendarActions';

//  Stores
import SettingsStore from '../stores/SettingsStore';

var utils;

class CalendarAPIUtils {

    constructor() {
        utils = this;

        // Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        this.client_id = '737977399720-tj5tl7jvqmt5jh3kp72j02i62uetlkkn.apps.googleusercontent.com';
        this.scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
    }

    /* Call the google API to get the list of calendars */
    getCalendarList(){

        //  Create the request
        let request = gapi.client.calendar.calendarList.list();

        //  Execute the request and get the response
        request.execute(function(resp) {            
            let cals = resp.items;
            if (cals.length > 0) {
                //  Call the action to receive the data:
                CalendarActions.recieveCalendarList(cals);
            }
            else{
                console.log("There was a problem getting the list of calendars");
            }                
        });
    }

    /* Call the google API to get the list of events for a calendarid */
    getCalendarEvents(calendarId){

        //  Set the min/max times for event display:
        let timeMin = (new Date()).toISOString();
        let tempTime = moment().endOf('day').toDate();
        let timeMax = tempTime.toISOString();

        //  Create the request
        let requestParams = {
          'calendarId': calendarId, /* Can be 'primary' or a given calendarid */
          'timeMin': timeMin,
          'timeMax': timeMax,
          'showDeleted': false,
          'singleEvents': true,
          'orderBy': 'startTime'
        };

        console.log("Requesting calendar events: ", requestParams);
        let request = gapi.client.calendar.events.list(requestParams);

        //  Execute the request and get the response
        request.execute(function(resp) {
            //  If we get a code == 403 here, should we attempt to re-authenticate or something?

            //  Call the action to receive the data:
            CalendarActions.recieveCalendarData(resp, calendarId);
        });
    }

    /* Get authorization from the google API for the given scope(s) */
    authorizeCalendar() {
        gapi.auth.authorize(
          {
            'client_id': this.client_id,
            'scope': this.scopes,
            'immediate': true
          }, utils.handleCalendarAuthResult);
    }

    /* Initiate auth flow in response to user clicking authorize button. */
    handleCalendarAuthClick(event) {
        gapi.auth.authorize(
          {
            'client_id': this.client_id,
            'scope': this.scopes,
            'immediate': false
          }, utils.handleCalendarAuthResult);
        return false;
    }

    /* Handle the google API authorization response */
    handleCalendarAuthResult(authResult) {

        if (authResult && !authResult.error) {
            CalendarActions.recieveCalendarAuthCheckResult(true);
            
            // Load the calendar API ...
            gapi.client.load('calendar', 'v3', function(){

                //  Then load the list of calendars
                utils.getCalendarList();

                //  Get the latest calendar information if we have a calendar selected:
                let settings = SettingsStore.getSettings();
                if(settings.calendarid != "") {
                  utils.getCalendarEvents(settings.calendarid);
                }
            });

        } else {
            // We're not authorized yet.  We should
            // allow the user to authorize
            CalendarActions.recieveCalendarAuthCheckResult(false);
        }
    }
}

module.exports = new CalendarAPIUtils();