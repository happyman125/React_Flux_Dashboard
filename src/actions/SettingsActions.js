import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class SettingsActions {

    recieveSettingsData(settingsData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_SETTINGS,
            settingsData: settingsData
        });
    }
        
}

export default new SettingsActions();