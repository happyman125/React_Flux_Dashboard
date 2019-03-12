import moment from 'moment';

import QuakeActions from '../actions/QuakeActions';

class QuakeAPIUtils {

    getQuakeList() {

        //  Get significant earthquakes from the last month
        let url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson`;

        fetch(url, {mode: 'cors'})
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Receive data
                response.json().then(function (data) {
                    //	Call the action to receive the data:
                    QuakeActions.recieveQuakeData(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
    
}

export default new QuakeAPIUtils();
