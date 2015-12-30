import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class SettingsStore extends Store {

	constructor(dispatcher){
		super(dispatcher);

		//	Settings we're tracking, along with their defaults
		this.settings = {};
		this.settings.weathersource = "Yahoo";
		this.settings.weathersource_apikey = "";
		this.settings.calendarid = "";
		this.settings.zipcode = "";
		this.settings.newsuser = "cnnbrk";
	}

	getSettings() {
		return this.settings;
	}

	__onDispatch(action) {
    
    switch(action.actionType) {
      case DashboardConstants.RECIEVE_SETTINGS:
        console.log('Updating settings store: ', action);
        this.settings = action.settingsData;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

module.exports = new SettingsStore(AppDispatcher);