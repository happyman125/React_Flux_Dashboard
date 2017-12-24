import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class QuakeStore extends Store {

  constructor(dispatcher) {
    super(AppDispatcher);

    this.quakeData = [];
  }

  getQuakeInfo() {
    return this.quakeData;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {

      case DashboardConstants.RECIEVE_QUAKE_INFO:
        try{
            //  Map the quake feature data to simple format:
            this.quakeData = action.quakeData.features.map(function (item) {
                return {
                    mag: item.properties.mag,
                    title: item.properties.place,
                    alert: item.properties.alert,
                    time: item.properties.time,
                    tsunami: item.properties.tsunami,
                    location: item.geometry.coordinates
                };
            });

            console.log('Updating quake store: ', this.quakeData);
            this.__emitChange();
        }catch(e){ 
            /* Don't do anything */
        }
        
        break;

      default:
        // no op
    }
  }

}

export default new QuakeStore();