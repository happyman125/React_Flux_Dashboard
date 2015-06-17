var AppDispatcher = require('../dispatcher/AppDispatcher');
var DashboardConstants = require('../constants/DashboardConstants');

var WeatherActions = {

  recieveWeatherData: function(weatherData) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_RAW_WEATHER,
      weatherData: weatherData
    });
  },

  recievePollenData: function(pollenData, zipcode) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_RAW_POLLEN,
      pollenData: pollenData,
      zipcode: zipcode
    });
  }

};

module.exports = WeatherActions;