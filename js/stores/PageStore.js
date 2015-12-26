import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

//  The page components
import DashboardHome from '../components/DashboardHome.react';
import DashboardSettings from '../components/DashboardSettings.react';

class PageStore extends Store {

  constructor(dispatcher){
    super(dispatcher);

    //  Default to the home page
    this.currentPage = DashboardHome;
  }

  getPage() {
    return this.currentPage;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case DashboardConstants.SHOW_SETTINGS:      
        console.log('Loading settings page...');
        this.currentPage = DashboardSettings;
        this.__emitChange();
        break;

      case DashboardConstants.SHOW_HOME:      
        console.log('Loading home page...');
        this.currentPage = DashboardHome;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

module.exports = new PageStore(AppDispatcher);