import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class WeatherStore extends Store {

  constructor(dispatcher){
    super(dispatcher);

    this.weatherdata = {
      /*
      currently: {
        icon: "",
        temperature: 0,
        windspeed: 0,
        wind_direction: 0,
        humidity: 0,
        apparent_temp: 0
        sunrise: "",
        sunset: "",        
      }, 
      daily: { 
        data: [{
          date: "",
          icon: "",
          summary: "",
          high: 0,
          low: 0,

        }]
      },
      alerts: []
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