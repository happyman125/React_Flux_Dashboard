import CalendarActions from '../actions/CalendarActions';

class CalendarAPIUtils {

    constructor() {
        // Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        this.client_id = '737977399720-tj5tl7jvqmt5jh3kp72j02i62uetlkkn.apps.googleusercontent.com';
        this.scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
        
        //  The base url for the service - change this to your service location:
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

    authorizeCalendar() {
        gapi.auth.authorize(
          {
            'client_id': this.client_id,
            'scope': this.scopes,
            'immediate': true
          }, this.handleCalendarAuthResult);
    }

    handleCalendarAuthResult(authResult) {
        if (authResult && !authResult.error) {
            console.log("GAPI successfully authorized");

            // Load the calendar API / send a message to the store (with an action) that we can use the calendar api
            gapi.client.load('calendar', 'v3', function(){console.log("GAPI calendar library loaded")});

        } else {
            console.log("GAPI NOT authorized");            
            // We're not authorized yet.  We should
            // allow the user to authorize
        }
    }
}

module.exports = new CalendarAPIUtils();