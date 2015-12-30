import CalendarActions from '../actions/CalendarActions';

var utils;

class CalendarAPIUtils {

    constructor() {
        utils = this;

        // Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        this.client_id = '737977399720-tj5tl7jvqmt5jh3kp72j02i62uetlkkn.apps.googleusercontent.com';
        this.scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
        
        //  Deprecated. The base url for the service - change this to your service location:
        //  You can get this microservice for free at https://github.com/danesparza/calendar-service
        this.baseurl = "http://service.cagedtornado.com:3000/calendar/";
    }

    getCurrentCalendarEvents(calendarId) {
    
        //  Get the calendar events for the given Google calendarid
        var url = this.baseurl + calendarId;

        console.log("Requesting calendar information for: " + calendarId);

        $.ajax( url )
        .done(function(data) {
            //  Call the action to receive the data:
            CalendarActions.recieveCalendarData(data, calendarId);
        }.bind(this))
        .fail(function() {
            //  Something bad happened
            console.log("There was a problem getting calendar data");
        });
    }

    /* Call the google API to get the list of calendars */
    getCalendarList(){

        let request = gapi.client.calendar.calendarList.list();

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

        //  Call the action to receive the data:
        //  CalendarActions.recieveCalendarData(data, calendarId);
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

                //  If we have a calendarId selected already,
                //  get the calendar events?
                //  this.getCalendarEvents(calendarid);
            });

        } else {
            // We're not authorized yet.  We should
            // allow the user to authorize
            CalendarActions.recieveCalendarAuthCheckResult(false);
        }
    }
}

module.exports = new CalendarAPIUtils();