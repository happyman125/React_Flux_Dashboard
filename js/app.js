import React from 'react';
window.React = React; // export for http://fb.me/react-devtools

//  Flat iron director
import director from 'director';

//  Cookie manager
var cookies = require('cookies-js');

//	The API utils
import WeatherAPIUtils from './utils/WeatherAPIUtils';
import CalendarAPIUtils from './utils/CalendarAPIUtils';
import NewsAPIUtils from './utils/NewsAPIUtils';
import SettingsUtils from './utils/SettingsUtils';

//	The app component
import DashboardApp from './components/DashboardApp.react';

//  The actions
import PageActions from './actions/PageActions';

//  The stores
import SettingsStore from './stores/SettingsStore';

//  Router setup
var router = director.Router({
  '/': function () { PageActions.showHome(); },
  '/settings': function () { PageActions.showSettings(); }
});
router.init('/');

//  'Google client loaded' handler 
window.handleGoogleClientLoad = function(){
    CalendarAPIUtils.authorizeCalendar();
}

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
    //  Read the settings (and update the stores):
    SettingsUtils.getSettings(SettingsUtils.settings_cookie);
    let settings = SettingsStore.getSettings();
    
    //  Get the calendarId and zipcode from cookies:
    var calendarId = settings.calendarid;
    var zipcode = settings.zipcode;

    //  We have coordinates -- get the weather data
    console.log("Using browser geocoordinates: ", position);
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
    var newsUser = settings.newsuser;
    NewsAPIUtils.getTwitterFeed(newsUser)

    //	Start the app
    React.render(<DashboardApp position={position} calendarid={calendarId} zipcode={zipcode} breakingnewsuser={newsUser} />, appElement);	
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
