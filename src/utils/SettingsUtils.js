import SettingsActions from '../actions/SettingsActions';

//  Cookie manager
import cookies from 'cookies-js';

class SettingsUtils {

    constructor() {
        this.settings_cookie = "dashboardsettings";
    }

    saveSettings(updatedSettings) {
        console.log("Saving settings", updatedSettings);

        //	Cookie operations to serialize and save
        cookies.set(this.settings_cookie, JSON.stringify(updatedSettings), {
            expires: Infinity
        });

        //	Call 'getSettings' to read & update the store:
        this.getSettings();
    }

    getSettings() {
        console.log("Getting settings...");

        //	Cookie operations to read and deserialize
        try {
            let settingsCookie = cookies.get(this.settings_cookie);

            if(settingsCookie != null)
            {
                console.log("The settings cookie", settingsCookie);
                let settings = JSON.parse(settingsCookie);

                //  Call the action to receive the data:
                SettingsActions.recieveSettingsData(settings);
            }
            else{
                console.log("The settings cookie is undefined");
            }
            
        } catch (ex) {
            console.log("There was a problem reading the cookie: ", ex);
        }
    }
}

export default new SettingsUtils();