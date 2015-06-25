var React = require('react');
var Moment = require('moment');

//  The components
var WeatherForecastHour = require('./WeatherForecastHour.react');
var WeatherForecast = require('./WeatherForecast.react');
var WeatherForecastIcon = require('./WeatherForecastIcon.react');
var WeatherAlerts = require('./WeatherAlerts.react');

//  The API utils
var WeatherAPIUtils = require('../utils/WeatherAPIUtils');

var WeatherDisplay = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    
    var temperature = 0;
    var windspeed = 0;
    var summary = "Loading...";
    var forecastdays = [];
    var forecasticon = "";
    var alerts = []
    var feelslike = 0;
    var nextfewhours = [];
    var sunrise = 0;
    var formattedSunrise = "";
    var sunset = 0;
    var formattedSunset = "";
    var pollendays = [];

    if(this.props.weather.currently) 
    {
      temperature = Math.round(this.props.weather.currently.temperature);
      windspeed = Math.round(this.props.weather.currently.windSpeed);
      summary = this.props.weather.hourly.summary;
      forecastdays = this.props.weather.daily.data;
      forecasticon = this.props.weather.currently.icon;
      feelslike = Math.round(this.props.weather.currently.apparentTemperature);
      sunrise = this.props.weather.daily.data[0].sunriseTime;
      formattedSunrise = Moment(sunrise * 1000).format("h:ma");
      sunset = this.props.weather.daily.data[0].sunsetTime;
      formattedSunset = Moment(sunset * 1000).format("h:ma");

      if(this.props.weather.alerts != null){
        alerts = this.props.weather.alerts;
      }

      //  Get the next few hours to display:
      nextfewhours = this.props.weather.hourly.data.slice(0,10);
      
      //  Set the current temperature color:
      var tempColor = WeatherAPIUtils.getTempColor(temperature);
      var feelslikeColor = WeatherAPIUtils.getTempColor(feelslike);

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
            Wind: {windspeed}mph • <span style={{color: feelslikeColor}}>Feels like: {feelslike} &deg;</span>
          </div>
          <div id="sunrise-sunset">
            <i className="wi wi-horizon"></i> {formattedSunrise} / <i className="wi wi-night-clear"></i> {formattedSunset}
          </div>
          
          <table id="hourlyforecast" className="table table-condensed">
            <tbody>
              {nextfewhours.map(function(forecasthour) {
                return <WeatherForecastHour key={forecasthour.time} forecast={forecasthour}/>;
              })}
            </tbody>
          </table>

          <WeatherForecast forecastdays={forecastdays} />

          <WeatherAlerts alerts={alerts} />
        </div>
    );
  }
});

module.exports = WeatherDisplay;