var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

//  Flat iron director
var director = require('director');

//  Cookie manager
var cookies = require('cookies-js');

//	The API utils
var WeatherAPIUtils = require('./utils/WeatherAPIUtils');
var CalendarAPIUtils = require('./utils/CalendarAPIUtils');
var NewsAPIUtils = require('./utils/NewsAPIUtils');

//	The app component
var DashboardApp = require('./components/DashboardApp.react');

//  The actions
var PageActions = require('./actions/PageActions');

//  Router setup
var router = director.Router({
  '/': function () { PageActions.showHome(); },
  '/settings': function () { PageActions.showSettings(); }
});
router.init('/');

//  Application element
var appElement = document.getElementById("dashboardapp");

//	The app requires geolocation!
if (navigator.geolocation) 
{
    navigator.geolocation.getCurrentPosition(showApp, showError);
}

/**
 * Shows the application if geolocation was successful
 * @param  {[type]} position [description]
 * @return {[type]}          [description]
 */
function showApp(position) {
    
    //  Get the calendarId and zipcode from cookies:
    var calendarId = cookies.get('calendarId');
    console.log("CalendarId from cookie: " + calendarId);
    
    var zipcode = cookies.get('zipcode');
    console.log("Zipcode from cookie: " + zipcode)

    //  We have coordinates -- get the weather data
    WeatherAPIUtils.getCurrentWeather(position.coords.latitude, position.coords.longitude);

    //  If we have a calendarId, get data:
    if(calendarId) {        
        CalendarAPIUtils.getCurrentCalendarEvents(calendarId);
    } 

    //  If we have a zipcode, get pollen data:
    if(zipcode){
        WeatherAPIUtils.getPollen(zipcode);
    }

    //  If we don't have one or more pieces of information, show the settings page:
    if(!(calendarId && zipcode)) {
        window.location.hash ="#/settings";
    }

    //  Get the news information:
    NewsAPIUtils.getTwitterFeed('cnnbrk', '10')

    //	Start the app
    React.render(<DashboardApp position={position} calendarid={calendarId} zipcode={zipcode} />, appElement);	
}

/**
 * Shows geolocation error
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            appElement.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            appElement.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            appElement.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            appElement.innerHTML = "An unknown error occurred."
            break;
    }
}
