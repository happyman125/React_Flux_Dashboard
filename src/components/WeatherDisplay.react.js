import React, { Component } from 'react';
import Moment from 'moment';

//  The components
import WeatherForecast from './WeatherForecast.react';
import WeatherForecastIcon from './WeatherForecastIcon.react';
import WeatherAlerts from './WeatherAlerts.react';

//  The API utils
import WeatherAPIUtils from '../utils/WeatherAPIUtils';

//  Stylesheets & images
import 'weathericons/css/weather-icons-wind.css';

class WeatherDisplay extends Component {

  render() {

    let temperature = 0;
    let windspeed = 0;
    let forecastdays = [];
    let forecasticon = "";
    let alerts = []
    let feelslike = 0;
    let sunrise = 0;
    let formattedSunrise = "";
    let sunset = 0;
    let formattedSunset = "";
    let pollendays = [];
    let formattedHumidity = "";
    let formattedStatus = "";
    let pollenSummary = "Loading...";
    let winddirectionicon = "";
    let pollenService = "Unknown pollen service";

    let UVIndex = 0;
    let UVClass = "badge";

    if (this.props.weather.currently) {
      //  Format the current weather summary:
      forecasticon = this.props.weather.currently.icon;
      temperature = Math.round(this.props.weather.currently.temperature);

      windspeed = Math.round(this.props.weather.currently.windspeed);
      formattedHumidity = Math.floor((this.props.weather.currently.humidity * 100));
      feelslike = Math.round(this.props.weather.currently.apparent_temp);

      sunrise = this.props.weather.currently.sunrise;
      formattedSunrise = Moment(sunrise).format("h:mma");
      sunset = this.props.weather.currently.sunset;
      formattedSunset = Moment(sunset).format("h:mma");

      forecastdays = this.props.weather.daily.data;

      formattedStatus = this.props.weather.source + ' last updated ' + this.props.updated + ' / '

      //  If we have alerts, use them
      if (this.props.weather.alerts != null) {
        alerts = this.props.weather.alerts;
      }

      //  Set the current temperature color:
      var tempColor = WeatherAPIUtils.getTempColor(temperature);

      //  Set the feels like color (if it's different from the current temp):
      var feelsLikeStyles = {};
      if (temperature !== feelslike) {
        feelsLikeStyles.color = WeatherAPIUtils.getTempColor(feelslike);
      }

      //  Set the UV index style:
      UVIndex = this.props.weather.currently.uvindex
      if(UVIndex <= 3){UVClass = "badge badge-success";}
      if(UVIndex > 3 && UVIndex < 6){UVClass = "badge badge-info";}
      if(UVIndex >= 6 && UVIndex < 8){UVClass = "badge badge-warning";}
      if(UVIndex >= 8){UVClass = "badge badge-danger";}

      //  Set the wind direction icon:
      winddirectionicon = WeatherAPIUtils.getWindDirectionIcon(this.props.weather.currently.wind_direction);

      //  Set pollen information
      if (this.props.pollen.data) {
        pollendays = this.props.pollen.data;

        //  Add the pollen data to the forecastdays
        for (var i = pollendays.length - 1; i >= 0; i--) {
          forecastdays[i].pollen = pollendays[i];
        };

        //  Set the pollen summary:
        pollenSummary = this.props.pollen.predominant_pollen;

        //  Set the pollen source:
        pollenService = "Pollen service: " + this.props.pollen.service;
      }
    }

    return (

      <div>
        <div id="temp" style={{ color: tempColor }}><WeatherForecastIcon icon={forecasticon} /> {temperature}&deg;</div>

        <div id="extended-summary">
          Wind: <i className={winddirectionicon}/> {windspeed}mph • {formattedHumidity} <i style={{color: "lightblue"}} className="wi wi-humidity"></i> • <span style={feelsLikeStyles}>Feels like: {feelslike} &deg;</span> • UV: <span className={UVClass}>{UVIndex}</span>
        </div>
        <div id="sunrise-sunset">
          <i className="wi wi-horizon"></i> {formattedSunrise} / <i className="wi wi-night-clear"></i> {formattedSunset}
        </div>

        <div className="dashboard-status">{this.props.locationname} / {formattedStatus} / {pollenService} <a href='/#/settings'>Settings</a></div>
        <WeatherForecast forecastdays={forecastdays} />

        <div id="pollen-summary">
          Predominant pollen: {pollenSummary}
        </div>

        <WeatherAlerts alerts={alerts} />

      </div>
    );
  }
}

export default WeatherDisplay;