import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class PageActions {

  showHome() {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.SHOW_HOME
    });
  }

  showSettings() {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.SHOW_SETTINGS
    });
  }

}

module.exports = new PageActions(AppDispatcher);