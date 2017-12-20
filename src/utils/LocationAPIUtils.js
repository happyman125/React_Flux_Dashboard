//  Actions
import LocationActions from '../actions/LocationActions';

class LocationAPIUtils {

    /* Get the current geolocation coordiates */
    getCurrentLocation(options) {

        let apikey = "AIzaSyCHsiUivE8jXyQZdhgElrV_j83VowVtoGM";

        //  Get the lat/long coordinates
        let url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apikey}`;

        fetch(url, {mode: 'cors', method: 'post'})
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
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

    /* Get Yahoo weather for the given coordinates */
    getLocationName(latitude, longitude) {

        //  Format the url
        let url = `https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=en&latlng=${latitude},${longitude}`

        fetch(url, {mode: 'cors'})
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Receive data
                response.json().then(function (data) {
                    if (data.status === "OK") {
                        //  Call the action to receive the data:
                        LocationActions.recieveLocationInfo(data.results);
                    } else {
                        console.log("When getting location name info, status was not OK")
                    }
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
}

export default new LocationAPIUtils();