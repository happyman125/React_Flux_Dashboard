//  Actions

//  The stores

class LocationAPIUtils {

    constructor() {
        
    }

    /* Get the current geolocation coordiates */
    getCurrentLocation(options) {

        let apikey = "AIzaSyCHsiUivE8jXyQZdhgElrV_j83VowVtoGM";

        //  Get the lat/long coordinates
        let url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apikey}`;

        $.ajax({ url: url, dataType: 'json', type: "POST"})
        .done(function(data) {

            //  If a success callback was specified, call it:
            if(typeof options.success === "function"){
                options.success({latitude: data.location.lat, longitude: data.location.lng});
            }

            //	Call the action to receive the data:
        	// WeatherActions.recieveWeatherData(data);
        }.bind(this))
        .fail(function() {
        	//	Something bad happened
        	console.log("There was a problem getting location");
        });
    }

    /* Get Yahoo weather for the given coordinates */
    getLocationName(latitude, longitude) {
        
        //  Format the url
        let url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${latitude},${longitude})")&format=json&env=store://datatables.org/alltableswithkeys`
        
        $.ajax( url )
        .done(function(data) {
            //  Convert the data to the common weather format
            let weatherdata = this.convertYahooToWeather(data);

            //  Call the action to receive the data:
            WeatherActions.recieveWeatherData(weatherdata);
        }.bind(this))
        .fail(function() {
            //  Something bad happened
            console.log("There was a problem getting weather");
        });
    }
}

module.exports = new LocationAPIUtils();