import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class LocationActions {

  recieveCurrentLocation(geoPoint) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_GEOPOINT,
      geopoint: geoPoint
    });
  }

  recieveLocationInfo(locationInfo) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_LOCATION_INFO,
      locationInfo: locationInfo
    });
  }

}

module.exports = new LocationActions(AppDispatcher);