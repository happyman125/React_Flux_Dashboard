var AppDispatcher = require('../dispatcher/AppDispatcher');
var DashboardConstants = require('../constants/DashboardConstants');

var PageActions = {

  showHome: function() {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.SHOW_HOME
    });
  },

  showSettings: function() {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.SHOW_SETTINGS
    });
  }

};

module.exports = PageActions;