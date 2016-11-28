import React from 'react';
window.React = React; // export for http://fb.me/react-devtools

//  Flat iron director
import director from 'director';

//	The API utils
import WeatherAPIUtils from './utils/WeatherAPIUtils';
import CalendarAPIUtils from './utils/CalendarAPIUtils';
import NewsAPIUtils from './utils/NewsAPIUtils';
import SettingsUtils from './utils/SettingsUtils';
import LocationAPIUtils from './utils/LocationAPIUtils';

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

console.log("Geting geolocation information from Google...");
LocationAPIUtils.getCurrentLocation({
    success: function (coords) {

        //  Get the location name:
        LocationAPIUtils.getLocationName(coords.latitude, coords.longitude);

        //  Read the settings (and update the stores):
        SettingsUtils.getSettings(SettingsUtils.settings_cookie);
        let settings = SettingsStore.getSettings();
        
        //  Get the calendarId and zipcode from cookies:
        var calendarId = settings.calendarid;
        var zipcode = settings.zipcode;

        //  We have coordinates -- get the weather data
        console.log("Using geocoordinates: ", coords);
        switch(settings.weathersource)
        {
            case "Yahoo":
                WeatherAPIUtils.getCurrentYahooWeather(coords.latitude, coords.longitude);
                break;
            case "Forecastio": 
                WeatherAPIUtils.getCurrentForecastIOWeather(coords.latitude, coords.longitude);
                break;
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

        //  Start the app
        React.render(<DashboardApp coords={coords} zipcode={zipcode} breakingnewsuser={newsUser} />, appElement);
    }
});

