var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DashboardConstants = require('../constants/DashboardConstants');
var CHANGE_EVENT = 'weather-change';

var _weatherdata = {};
var _pollendata = {};
var _pollenZipcode = "";

function setWeather(weather) {
  _weatherdata = weather;
}

function setPollen(pollen){
  _pollendata = pollen;
}

function setPollenZipcode(zipcode){
  _pollenZipcode = zipcode;
}

var WeatherStore = assign({}, EventEmitter.prototype, {

  getWeather: function() {
    return _weatherdata;
  },

  getPollen: function(){
    return _pollendata;
  },

  getPollenZipcode: function(){
    return _pollenZipcode;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  
  switch(action.actionType) {
    case DashboardConstants.RECIEVE_RAW_WEATHER:      
      var weatherData = action.weatherData;
      console.log('Refreshing weather..');
      setWeather(weatherData);
      WeatherStore.emitChange();
      break;

    case DashboardConstants.RECIEVE_RAW_POLLEN:
      var pollenData = action.pollenData;
      var zipcode = action.zipcode;
      console.log('Refreshing pollen..');
      setPollen(pollenData);
      console.log('Updating zipcode..');
      setPollenZipcode(zipcode);
      WeatherStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = WeatherStore;