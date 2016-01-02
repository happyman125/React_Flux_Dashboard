//  Actions
import WeatherActions from '../actions/WeatherActions';

class WeatherAPIUtils {

    constructor() {
        //  We should try formatting this with an ES6 template string.  See 
        //  https://babeljs.io/docs/learn-es2015/#template-strings for more info 
        this.yahoobaseurl = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.placefinder WHERE text="34.0485975,-84.2267117" and gflags="R")';
    }

    getCurrentForecastIOWeather(latitude, longitude) {
        //  Deprecated.  We will be calling forecastio directly (and storing the API key in settings)

        //  The base url for the service - change this to your service location:
        //  You can get this microservice for free at https://github.com/danesparza/forecast-service
        let baseurl = "http://service.cagedtornado.com:3030/forecast/";

        //  Get the weather for the given lat/long coordinates
        let url = baseurl + latitude + "," + longitude;

        $.ajax( url )
        .done(function(data) {
            //  Convert the data to the common weather format

        	//	Call the action to receive the data:
        	WeatherActions.recieveWeatherData(data);
        }.bind(this))
        .fail(function() {
        	//	Something bad happened
        	console.log("There was a problem getting weather");
        });
    }

    getCurrentYahooWeather(latitude, longitude) {
        //  Format the yahoo url
        let url = this.yahoobaseurl;

        $.ajax( url )
        .done(function(data) {
            //  Convert the data to the common weather format

            //  Call the action to receive the data:
            //  WeatherActions.recieveWeatherData(data);
        }.bind(this))
        .fail(function() {
            //  Something bad happened
            console.log("There was a problem getting weather");
        });
    }

    getPollen(zipcode){
        //  The base url for the service - change this to your service location:
        //  You can get this microservice for free at https://github.com/danesparza/forecast-service
        let baseurl = "http://service.cagedtornado.com:3030/pollen/";

        //  Get the pollen for the given zipcode
        let url = baseurl + zipcode;

        $.ajax( url )
        .done(function(data) {
            //  Call the action to receive the data:
            WeatherActions.recievePollenData(data, zipcode);
        }.bind(this))
        .fail(function() {
            //  Something bad happened
            console.log("There was a problem getting pollen data");
        });
    }

    /* Get the color for the given temperature */
    getTempColor(temperature) {
      
        //  Create a new spectrum:
        let rainbow = new Rainbow();

        //  Set our spectrum colors:
        rainbow.setSpectrum("FFC0E4", "D0338D", "33D0C4", "337DD0", "33D035", "DAD82D", "F08E00", "D03333");  

        //  Get the color for the given temperature:
        let appColor = "#" + rainbow.colorAt(temperature);

        return appColor;
    }

}

module.exports = new WeatherAPIUtils();