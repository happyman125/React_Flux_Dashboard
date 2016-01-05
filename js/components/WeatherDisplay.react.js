import {Component} from 'react';
import Moment from 'moment';

//  The components
import WeatherForecast from './WeatherForecast.react';
import WeatherForecastIcon from './WeatherForecastIcon.react';
import WeatherAlerts from './WeatherAlerts.react';

//  The API utils
import WeatherAPIUtils from '../utils/WeatherAPIUtils';

class WeatherDisplay extends Component {

  render() {
    
    var temperature = 0;
    var windspeed = 0;
    var forecastdays = [];
    var forecasticon = "";
    var alerts = []
    var feelslike = 0;
    var sunrise = 0;
    var formattedSunrise = "";
    var sunset = 0;
    var formattedSunset = "";
    var pollendays = [];
    var formattedHumidity = "";
    let formattedStatus = "";

    if(this.props.weather.currently) 
    {
      //  Format the current weather summary:
      forecasticon = this.props.weather.currently.icon;
      temperature = Math.round(this.props.weather.currently.temperature);
      
      windspeed = Math.round(this.props.weather.currently.windspeed);
      formattedHumidity = Math.floor((this.props.weather.currently.humidity * 100)); 
      formattedHumidity = formattedHumidity + "%"
      feelslike = Math.round(this.props.weather.currently.apparent_temp);

      sunrise = this.props.weather.currently.sunrise;
      formattedSunrise = Moment(sunrise).format("h:mma");
      sunset = this.props.weather.currently.sunset;
      formattedSunset = Moment(sunset).format("h:mma");

      forecastdays = this.props.weather.daily.data;

      formattedStatus = this.props.weather.source + ' last updated ' + Moment(this.props.weather.lastupdated).format("h:mma")

      //  If we have alerts, use them
      if(this.props.weather.alerts != null){
        alerts = this.props.weather.alerts;
      }

      //  Set the current temperature color:
      var tempColor = WeatherAPIUtils.getTempColor(temperature);

      //  Set the feels like color (if it's different from the current temp):
      var feelsLikeStyles = {};
      if(temperature != feelslike)
      {
        feelsLikeStyles.color = WeatherAPIUtils.getTempColor(feelslike);  
      }

      //  Set pollen information
      if(this.props.pollen.PollenCount)
      {
        pollendays = this.props.pollen.PollenCount;

        //  Add the pollen data to the forecastdays
        for (var i = pollendays.length - 1; i >= 0; i--) {
          forecastdays[i].pollen = pollendays[i];
        };
      }
    }

  	return (

        <div className="row">
          <div id="temp" style={{color: tempColor}}><WeatherForecastIcon icon={forecasticon} /> {temperature}&deg;</div>

          <div id="extended-summary">
            Wind: {windspeed}mph • {formattedHumidity} humidity • <span style={feelsLikeStyles}>Feels like: {feelslike} &deg;</span>
          </div>
          <div id="sunrise-sunset">
            <i className="wi wi-horizon"></i> {formattedSunrise} / <i className="wi wi-night-clear"></i> {formattedSunset}
          </div>

          <WeatherForecast forecastdays={forecastdays} />

          <WeatherAlerts alerts={alerts} />
          <div className="dashboard-status">{formattedStatus}</div>
        </div>
    );
  }
}

export default WeatherDisplay;