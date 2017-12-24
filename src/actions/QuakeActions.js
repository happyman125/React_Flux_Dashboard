import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class QuakeActions {

    recieveQuakeData(quakeData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_QUAKE_INFO,
            quakeData: quakeData
        });
    }

};

export default new QuakeActions();