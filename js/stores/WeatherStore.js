import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class WeatherStore extends Store {

  constructor(dispatcher){
    super(dispatcher);

    this.weatherdata = {
      /*

      currently: {
        temperature: 0,
        sunrise: "",
        sunset: "",
        humidity: 0,
        windspeed: 0,
        wind_direction: 0,
        apparent_temp: 0,
        code: 0,
        summary: ""
      }, 
      daily: { 
        data: []
      },

      /* Hourly is deprecated */
      /*
      hourly: {
        summary: "",
        data: []} 
      */
    };

    this.pollendata = {};
    this.pollenZipcode = "";
  }

  getWeather() {
    return this.weatherdata;
  }

  getPollen() {
    return this.pollendata;
  }

  getPollenZipcode() {
    return this.pollenZipcode;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case DashboardConstants.RECIEVE_RAW_WEATHER:
        console.log('Updating weather store: ', action);
        this.weatherdata = action.weatherData;
        this.__emitChange();
        break;

      case DashboardConstants.RECIEVE_RAW_POLLEN:
        console.log('Updating weather store: ', action);
        this.pollendata = action.pollenData;
        this.pollenZipcode = action.zipcode;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

module.exports = new WeatherStore(AppDispatcher);