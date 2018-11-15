import Moment from 'moment';
import Rainbow from 'rainbowvis.js';
import fetchJsonp from 'fetch-jsonp';

//  Actions
import WeatherActions from '../actions/WeatherActions';

//  The stores
import SettingsStore from '../stores/SettingsStore';

class WeatherAPIUtils {

    /* Get the Forecast.io weather for the given coordiates */
    getCurrentForecastIOWeather(latitude, longitude) {

        let settings = SettingsStore.getSettings();
        let apikey = settings.weathersource_apikey;

        //  Get the weather for the given lat/long coordinates
        let url = `https://api.darksky.net/forecast/${apikey}/${latitude},${longitude}`;
        let weatherUtils = this;

        fetchJsonp(url)
            .then(function (response) {
                return response.json()
            }).then(function (json) {
                let weatherdata = weatherUtils.convertForecastIOToWeather(json);

                //	Call the action to receive the data:
                WeatherActions.recieveWeatherData(weatherdata);
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })

    }

    /* Convert Forecast.io data to the standard model */
    convertForecastIOToWeather(fdata) {

        //  Map the daily data to the common format
        let dailyData = fdata.daily.data.map(function (day) {

            return {
                summary: day.summary,
                date: day.time,
                icon: day.icon,
                high: day.temperatureMax,
                low: day.temperatureMin,
                precipProbability: day.precipProbability
            };
        });

        //  Convert the rest of the data to the common weather format
        let weatherdata = {
            currently: {
                icon: fdata.currently.icon,
                temperature: fdata.currently.temperature,
                windspeed: fdata.currently.windSpeed,
                wind_direction: fdata.currently.windBearing,
                humidity: fdata.currently.humidity,
                apparent_temp: fdata.currently.apparentTemperature,
                sunrise: fdata.daily.data[0].sunriseTime * 1000,
                sunset: fdata.daily.data[0].sunsetTime * 1000,
                uvindex: fdata.currently.uvIndex,
            },
            daily: {
                data: dailyData
            },
            alerts: [],
            source: "Darksky.net",
            lastupdated: new Date()
        };

        return weatherdata;
    }

    /* Get Yahoo weather for the given coordinates */
    getCurrentYahooWeather(latitude, longitude) {

        //  Format the yahoo url
        let url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${latitude},${longitude})")&format=json&env=store://datatables.org/alltableswithkeys`
        let weatherUtils = this;

        fetch(url, { mode: 'cors' })
            .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Receive data
                response.json().then(function (data) {
                    //  Convert the data to the common weather format
                    let weatherdata = weatherUtils.convertYahooToWeather(data);

                    //  Call the action to receive the data:
                    WeatherActions.recieveWeatherData(weatherdata);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    /* Convert Yahoo data format to the standard model */
    convertYahooToWeather(ydata) {

        let yw = ydata.query.results.channel;

        //  Map the daily data to the common format
        let dailyData = yw.item.forecast.map(function (day) {

            //  Sanity check the high and low:
            let low = parseInt(yw.item.condition.temp, 10);
            if (parseInt(day.low, 10) < parseInt(day.high, 10)) {
                low = parseInt(day.low, 10);
            }

            return {
                summary: day.text,
                date: Moment(day.date, "D MMM YYYY").unix(),
                icon: day.code,
                high: parseInt(day.high, 10),
                low: low,
                precipProbability: 0
            };
        });

        let startofday = Moment().startOf('day').format('MMM D, YYYY');

        //  Convert the rest of the data to the common weather format
        let weatherdata = {
            currently: {
                icon: yw.item.condition.code,
                temperature: parseInt(yw.item.condition.temp, 10),
                windspeed: parseInt(yw.wind.speed, 10),
                wind_direction: parseInt(yw.wind.direction, 10),
                humidity: parseInt(yw.atmosphere.humidity, 10) / 100,
                apparent_temp: parseInt(yw.wind.chill, 10),
                sunrise: Date.parse(startofday + ' ' + yw.astronomy.sunrise),
                sunset: Date.parse(startofday + ' ' + yw.astronomy.sunset),
                uvindex: null,
            },
            daily: {
                data: dailyData
            },
            alerts: [],
            source: "Yahoo weather",
            lastupdated: new Date()
        };

        return weatherdata;
    }

    /* Get pollen counts for the given zipcode */
    getPollen(zipcode) {
        //  The base url for the service - change this to your service location:
        let baseurl = "https://qb9uu1nz2b.execute-api.us-east-1.amazonaws.com/v1/pollen?zip=";

        //  Get the pollen for the given zipcode
        let url = baseurl + zipcode;

        fetch(url, { mode: 'cors' })
            .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Receive data
                response.json().then(function (data) {
                    //  Call the action to receive the data:
                    WeatherActions.recievePollenData(data, zipcode);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    /* Get the color for the given temperature */
    getTempColor(temperature) {

        //  Create a new spectrum:
        let rainbow = new Rainbow();

        //  Set our spectrum colors:
        rainbow.setSpectrum("FFC0E4", "D0338D", "33D0C4", "337DD0", "33D035", "DAD82D", "F08E00", "D03333");

        //  Get the color for the given temperature:
        let appColor = "#" + rainbow.colorAt(temperature);

        return appColor;
    }

    // Gets the wind direction icon to use for a given wind directional heading
    getWindDirectionIcon(direction) {

        let retval = `wi wi-wind from-${direction}-deg`;

        return retval;

    }

}

export default new WeatherAPIUtils();