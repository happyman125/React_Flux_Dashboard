import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

var SettingsActions = {

  recieveSettingsData: function(settingsData) {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.RECIEVE_SETTINGS,
      settingsData: settingsData
    });
  }

};

module.exports = SettingsActions;