import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class LocationInfoStore extends Store {

  constructor(dispatcher){
    super(AppDispatcher);

    this.locationinfo = [];
    this.geopoint = {};
  }

  getGeoPoint() {
    return this.geopoint;
  }

  getLocationInfo() {
    return this.locationinfo;
  }

  getLocationName() {
    let retval = "Unknown location";

    //  If we actually have some location information,
    //  rip through it
    for (let i = 0; i < this.locationinfo.length; i++) {
      //  Look for the first object that includes a 'type'
      //  property of 'locality' and return the 
      //  associated 'formatted_address'  
      if(typeof this.locationinfo[i].types.includes === "function" && this.locationinfo[i].types.includes("locality"))
      {
        retval = this.locationinfo[i].formatted_address;
        break;
      }
    }

    return retval;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case DashboardConstants.RECIEVE_GEOPOINT:
        console.log('Updating current location: ', action);
        this.geopoint = action.geopoint;
        this.__emitChange();
        break;

      case DashboardConstants.RECIEVE_LOCATION_INFO:
        console.log('Updating location information: ', action);
        this.locationinfo = action.locationInfo;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new LocationInfoStore();