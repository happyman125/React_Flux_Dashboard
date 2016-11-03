import Moment from 'moment';

//  Actions
import WeatherActions from '../actions/WeatherActions';

//  The stores
import SettingsStore from '../stores/SettingsStore';

class WeatherAPIUtils {

    constructor() {
        
    }

    /* Get the Forecast.io weather for the given coordiates */
    getCurrentForecastIOWeather(latitude, longitude) {

        let settings = SettingsStore.getSettings();
        let apikey = settings.weathersource_apikey;

        //  Get the weather for the given lat/long coordinates
        let url = `https://api.forecast.io/forecast/${apikey}/${latitude},${longitude}?callback=?`;

        $.ajax({ url: url, dataType: 'json', async: false})
        .done(function(data) {

            let weatherdata = this.convertForecastIOToWeather(data);

        	//	Call the action to receive the data:
        	WeatherActions.recieveWeatherData(weatherdata);
        }.bind(this))
        .fail(function() {
        	//	Something bad happened
        	console.log("There was a problem getting weather");
        });
    }

    /* Convert Forecast.io data to the standard model */
    convertForecastIOToWeather(fdata){

        //  Map the daily data to the common format
        var dailyData = [];
        fdata.daily.data.map(function(day) {

            dailyData.push({
                summary: day.summary,
                date: day.time,
                icon: day.icon,
                high: day.temperatureMax,
                low: day.temperatureMin,
                precipProbability: day.precipProbability
            });
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
          }, 
          daily: { 
            data: dailyData
          },
          alerts: [],
          source: "Forecast.io",
          lastupdated: new Date()
        };

        return weatherdata;
    }

    /* Get Yahoo weather for the given coordinates */
    getCurrentYahooWeather(latitude, longitude) {
        
        //  Format the yahoo url
        let url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${latitude},${longitude})")&format=json&env=store://datatables.org/alltableswithkeys`
        
        $.ajax( url )
        .done(function(data) {
            //  Convert the data to the common weather format
            let weatherdata = this.convertYahooToWeather(data);

            //  Call the action to receive the data:
            WeatherActions.recieveWeatherData(weatherdata);
        }.bind(this))
        .fail(function() {
            //  Something bad happened
            console.log("There was a problem getting weather");
        });
    }

    /* Convert Yahoo data format to the standard model */
    convertYahooToWeather(ydata){

        let yw = ydata.query.results.channel;

        //  Map the daily data to the common format
        var dailyData = [];
        yw.item.forecast.map(function(day) {

            //  Sanity check the high and low:
            let low = parseInt(yw.item.condition.temp);
            if(parseInt(day.low) < parseInt(day.high)) {
                low = parseInt(day.low);
            }

            dailyData.push({
                summary: day.text,
                date: Moment(day.date, "D MMM YYYY").unix(),
                icon: day.code,
                high: parseInt(day.high), 
                low: low,
                precipProbability: 0
            });
        });
        
        let startofday = Moment().startOf('day').format('MMM D, YYYY');

        //  Convert the rest of the data to the common weather format
        let weatherdata = {    
          currently: {
            icon: yw.item.condition.code, 
            temperature: parseInt(yw.item.condition.temp),
            windspeed: parseInt(yw.wind.speed),
            wind_direction: parseInt(yw.wind.direction),
            humidity: parseInt(yw.atmosphere.humidity) / 100,
            apparent_temp: parseInt(yw.wind.chill),
            sunrise: Date.parse(startofday + ' ' + yw.astronomy.sunrise), 
            sunset: Date.parse(startofday + ' ' + yw.astronomy.sunset),    
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
        let baseurl = "https://mbxawsgue8.execute-api.us-east-1.amazonaws.com/v1/";

        //  Get the pollen for the given zipcode
        let url = baseurl + zipcode;

        $.ajax( url )
        .done(function(data) {
            //  Call the action to receive the data:
            WeatherActions.recievePollenData(data, zipcode);
        }.bind(this))
        .fail(function() {
            //  Something bad happened
            console.log("There was a problem getting pollen data");
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

}

module.exports = new WeatherAPIUtils();