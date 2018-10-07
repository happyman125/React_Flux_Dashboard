//  Actions
import LocationActions from '../actions/LocationActions';

class LocationAPIUtils {

    constructor() {
        // Your API key can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        this.apikey = "AIzaSyCHsiUivE8jXyQZdhgElrV_j83VowVtoGM";
    }

    /* Get the current geolocation coordiates */
    getCurrentLocation(options) {

        //  Get the lat/long coordinates
        let url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${this.apikey}`;

        fetch(url, {mode: 'cors', method: 'post'})
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem: ', response);
                    return;
                }

                // Receive data
                response.json().then(function (data) {
                    //  Call the action to receive the data:
                    LocationActions.recieveCurrentLocation({
                        latitude: data.location.lat,
                        longitude: data.location.lng
                    });

                    //  If a success callback was specified, call it:
                    if (typeof options.success === "function") {
                        options.success({
                            latitude: data.location.lat,
                            longitude: data.location.lng
                        });
                    }
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

    /* Get Location name for the given coordinates */
    getLocationName(latitude, longitude) {

        //  Format the url
        let url = `https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=en&key=${this.apikey}&latlng=${latitude},${longitude}`

        fetch(url, {mode: 'cors'})
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.error('Looks like there was a problem: ', response);
                    return;
                }

                // Receive data
                response.json().then(function (data) {
                    if (data.status === "OK") {
                        //  Call the action to receive the data:
                        LocationActions.recieveLocationInfo(data.results);
                    } else {
                        console.warn("When getting location name info, status was not OK: ", url, response);
                    }
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

    /* Gets the formatted google maps static image url for the given latitude and longitude */
    getGoogleMapsImageUrl(latitude, longitude){
        let zoomLevel = 3;
        let size = "175x150";
        let mapType = "roadmap";

        return `https://maps.googleapis.com/maps/api/staticmap?zoom=${zoomLevel}&size=${size}&maptype=${mapType}&markers=${latitude},${longitude}&key=${this.apikey}`;
    }
}

export default new LocationAPIUtils();