import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class WeatherStore extends Store {

  constructor(dispatcher){
    super(dispatcher);

    this.weatherdata = {};
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
        console.log('Refreshing weather..');
        this.weatherdata = action.weatherData;
        this.__emitChange();
        break;

      case DashboardConstants.RECIEVE_RAW_POLLEN:
        console.log('Refreshing pollen..');
        this.pollendata = action.pollenData;
        console.log('Updating zipcode..');
        this.pollenZipcode = action.zipcode;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

module.exports = new WeatherStore(AppDispatcher);