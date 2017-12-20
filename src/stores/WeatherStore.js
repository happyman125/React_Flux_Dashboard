import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class WeatherStore extends Store {

  constructor(){
    super(AppDispatcher);

    this.weatherdata = {};
    this.pollendata = {};
    this.pollenZipcode = ""; /* Deprecated.  We should get this from settings */
  }

  getWeather() {
    return this.weatherdata;
  }

  getPollen() {
    return this.pollendata;
  }

  /* Deprecated.  We should get this from settings */
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

export default new WeatherStore();