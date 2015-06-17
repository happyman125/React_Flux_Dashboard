
var WeatherActions = require('../actions/WeatherActions');

module.exports = {

  getCurrentWeather: function(latitude, longitude) {
    
    //  The base url for the service - change this to your service location:
    //  You can get this microservice for free at https://github.com/danesparza/forecast-service
    var baseurl = "http://service.cagedtornado.com:3030/forecast/";

    //  Get the weather for the given lat/long coordinates
    var url = baseurl + latitude + "," + longitude;

    $.ajax( url )
    .done(function(data) {
    	//	Call the action to receive the data:
    	WeatherActions.recieveWeatherData(data);
    }.bind(this))
    .fail(function() {
    	//	Something bad happened
    	console.log("There was a problem getting weather");
    });
  }, 

  getPollen: function(zipcode){
    
     //  The base url for the service - change this to your service location:
    //  You can get this microservice for free at https://github.com/danesparza/forecast-service
    var baseurl = "http://service.cagedtornado.com:3030/pollen/";

    //  Get the pollen for the given zipcode
    var url = baseurl + zipcode;

    $.ajax( url )
    .done(function(data) {
        //  Call the action to receive the data:
        WeatherActions.recievePollenData(data, zipcode);
    }.bind(this))
    .fail(function() {
        //  Something bad happened
        console.log("There was a problem getting pollen data");
    });
  },

  /* Get the color for the given temperature */
  getTempColor: function(temperature) {
      
    //  Create a new spectrum:
    var rainbow = new Rainbow();

    //  Set our spectrum colors:
    rainbow.setSpectrum("D0338D", "33D0C4", "337DD0", "33D035", "DAD82D", "F08E00", "D03333");  

    //  Get the color for the given temperature:
    var appColor = "#" + rainbow.colorAt(temperature);

    return appColor;

    }

};