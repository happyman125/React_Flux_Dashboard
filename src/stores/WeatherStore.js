import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';
import moment from 'moment';

class WeatherStore extends Store {

  constructor(){
    super(AppDispatcher);

    this.weatherdata = {};
    this.pollendata = {};
    this.pollenZipcode = ""; /* Deprecated.  We should get this from settings */
    this.last_update_time = "Never";
  }

  //  Returns the last time the store was updated with weather data
  getLastUpdateTime(){
    return this.last_update_time;
  }

  //  Gets the weather data
  getWeather() {
    return this.weatherdata;
  }

  //  Gets the pollen data
  getPollen() {
    return this.pollendata;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case DashboardConstants.RECIEVE_RAW_WEATHER:
        console.log('Updating weather store: ', action);
        this.weatherdata = action.weatherData;
        this.last_update_time = moment().format("h:mma")
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