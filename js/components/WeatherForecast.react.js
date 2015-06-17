var React = require('react');

//  The components
var WeatherForecastDay = require('./WeatherForecastDay.react');
var WeatherForecastDaySummary = require('./WeatherForecastDaySummary.react');

var WeatherForecast = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    
    //  First, see if we have a forecast
    if(this.props.forecastdays.length < 1) {
      return null;
    }

    //  Slice to just the next 5 days:
    var next5days = this.props.forecastdays.slice(0,5);

  	return (

        <table id="forcast" className="table table-condensed">
          <tbody>
            {next5days.map(function(forecastday) {
              return [<WeatherForecastDay key={forecastday.time} forecast={forecastday}/>, <WeatherForecastDaySummary key={forecastday.time + "summary"} forecast={forecastday}/>];
            })}
          </tbody>
        </table>
    );
  }
});

module.exports = WeatherForecast;