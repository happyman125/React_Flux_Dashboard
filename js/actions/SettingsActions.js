import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class SettingsActions {

  recieveSettingsData(settingsData) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_SETTINGS,
      settingsData: settingsData
    });
  }

}

module.exports = new SettingsActions(AppDispatcher);