import moment from 'moment';

import QuakeActions from '../actions/QuakeActions';

class QuakeAPIUtils {

    constructor(){
        this.googleMapAPIKey = "AIzaSyDvYQZRLnesuRRp07bu9qlbL7XJ_TkBYNU";
    }

    getQuakeList() {

        let formattedDate = moment().subtract(7, 'days').format("YYYY-MM-DD");
        let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formattedDate}&minmagnitude=6`;

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

    //  Gets the formatted google maps static image url for the given latitude and longitude
    getGoogleMapsImageUrl(latitude, longitude){
        return `https://maps.googleapis.com/maps/api/staticmap?zoom=4&size=175x150&maptype=roadmap&&markers=${latitude},${longitude}&key=${this.googleMapAPIKey}`;
    }

}

export default new QuakeAPIUtils();