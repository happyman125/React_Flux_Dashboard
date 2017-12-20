import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

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

export default new WeatherActions();