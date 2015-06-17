var React = require('react');
var Moment = require('moment');

//  The components
var WeatherForecastIcon = require('./WeatherForecastIcon.react');

var WeatherForecastDay = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    
    //  Format the display:
    var tempHigh = Math.round(this.props.forecast.temperatureMax);
    var tempLow = Math.round(this.props.forecast.temperatureMin);
    var forecastDay = this.props.forecast.time;
    var formattedDay = Moment(forecastDay * 1000).format("dddd");
    var forcastIcon = this.props.forecast.icon;
    var formattedPercentage = ""

    //  If it looks like it's not clear or partly-anything, then there is probably a change of precipitation:
    if(forcastIcon.indexOf("clear") < 0 && forcastIcon.indexOf("partly") < 0)
    {
      formattedPercentage = Math.floor((this.props.forecast.precipProbability * 100)); 
      formattedPercentage = formattedPercentage + "%"
    }

  	return (

        <tr className="forcast-datarow">
          <td>{formattedDay}</td>
          <td><WeatherForecastIcon icon={forcastIcon} /> {formattedPercentage}</td>
          <td>{tempHigh}</td>
          <td>{tempLow}</td>
        </tr>
    );
  }
});

module.exports = WeatherForecastDay;