var AppDispatcher = require('../dispatcher/AppDispatcher');
var DashboardConstants = require('../constants/DashboardConstants');

var LocationActions = {

  recieveCurrentLocation: function(geoPoint) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_GEOPOINT,
      geopoint: geoPoint
    });
  },

  recieveLocationInfo: function(locationInfo) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_LOCATION_INFO,
      locationInfo: locationInfo
    });
  }

};

module.exports = LocationActions;