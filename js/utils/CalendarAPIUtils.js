
var CalendarActions = require('../actions/CalendarActions');

module.exports = {

  getCurrentCalendarEvents: function(calendarId) {
    
    //  The base url for the service - change this to your service location:
    //  You can get this microservice for free at https://github.com/danesparza/calendar-service
    var baseurl = "http://service.cagedtornado.com:3000/calendar/";
    
    //  Get the calendar events for the given Google calendarid
    var url = baseurl + calendarId;

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

};