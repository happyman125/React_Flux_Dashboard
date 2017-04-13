import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class WeatherActions {

  recieveWeatherData(weatherData) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_RAW_WEATHER,
      weatherData: weatherData
    });
  }

  recievePollenData(pollenData, zipcode) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_RAW_POLLEN,
      pollenData: pollenData,
      zipcode: zipcode
    });
  }

}

module.exports = new WeatherActions(AppDispatcher);