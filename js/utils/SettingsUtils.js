import SettingsActions from '../actions/SettingsActions';

//  Cookie manager
import cookies from 'cookies-js';

class SettingsUtils {

	constructor() {
		this.settings_cookie = "dashboardsettings";
	}

	saveSettings(updatedSettings) {
	
		//	Cookie operations to serialize and save
		cookies.set(this.settings_cookie, JSON.stringify(updatedSettings), { expires: Infinity });

		//	Call 'getSettings' to read & update the store:
		this.getSettings();
	}

	getSettings() {

		//	Cookie operations to read and deserialize
		let settings = JSON.parse(cookies.get(this.settings_cookie));
		 
		//  Call the action to receive the data:
		SettingsActions.recieveSettingsData(settings);
	}
}

module.exports = new SettingsUtils();