import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//	The API utils
import WeatherAPIUtils from './utils/WeatherAPIUtils';
import CalendarAPIUtils from './utils/CalendarAPIUtils';
import NewsAPIUtils from './utils/NewsAPIUtils';
import SettingsUtils from './utils/SettingsUtils';
import LocationAPIUtils from './utils/LocationAPIUtils';

//  The stores
import SettingsStore from './stores/SettingsStore';

//  'Google client loaded' handler 
window.handleGoogleClientLoad = function(){
    console.log("Google client loaded.  Calling authorize calendar...");
    CalendarAPIUtils.authorizeCalendar();
}

console.log("Geting geolocation information from Google...");
LocationAPIUtils.getCurrentLocation({
    success: function (coords) {
        //  Make sure we start the calendar auth flow
        CalendarAPIUtils.authorizeCalendar();

        //  Get the location name:
        LocationAPIUtils.getLocationName(coords.latitude, coords.longitude);

        //  Read the settings (and update the stores):
        SettingsUtils.getSettings(SettingsUtils.settings_cookie);
        let settings = SettingsStore.getSettings();
        
        //  Get the calendarId and zipcode from cookies:
        let calendarId = settings.calendarid;
        let zipcode = settings.zipcode;

        //  We have coordinates -- get the weather data
        switch(settings.weathersource)
        {
            case "Yahoo":
                WeatherAPIUtils.getCurrentYahooWeather(coords.latitude, coords.longitude);
                break;
            case "Forecastio": 
                WeatherAPIUtils.getCurrentForecastIOWeather(coords.latitude, coords.longitude);
                break;
            default:
                /* No-op */
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
        let newsUser = settings.newsuser;
        NewsAPIUtils.getTwitterFeed(newsUser)

        //  Start the app
        ReactDOM.render(<App coords={coords} zipcode={zipcode} breakingnewsuser={newsUser} />, document.getElementById('root'));
    }
});

registerServiceWorker();