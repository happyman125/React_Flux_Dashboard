var React = require('react');
var Moment = require('moment');

//  The components
var WeatherForecastIcon = require('./WeatherForecastIcon.react');

//  The API utils
var WeatherAPIUtils = require('../utils/WeatherAPIUtils');

var WeatherForecastDay = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    
    //  Format the display:
    var tempCurrent = Math.round(this.props.forecast.temperature);
    var forecastTime = this.props.forecast.time;
    var formattedTime = Moment(forecastTime * 1000).format("ha");
    var forcastIcon = this.props.forecast.icon;
    var formattedPercentage = "";
    var tempColor = WeatherAPIUtils.getTempColor(tempCurrent);

    //  If it looks like it's not clear or partly-anything, then there is probably a change of precipitation:
    if(forcastIcon.indexOf("clear") < 0 && forcastIcon.indexOf("partly") < 0 && this.props.forecast.precipProbability > .10)
    {
      formattedPercentage = Math.floor((this.props.forecast.precipProbability * 100)); 
      formattedPercentage = formattedPercentage + "%"
    }

  	return (

        <td className="forecasthour" style={{backgroundColor: tempColor}}>
          {formattedTime} <br/>
          <WeatherForecastIcon icon={forcastIcon} /> {formattedPercentage}<br/>
          {tempCurrent} <br/>                  
        </td>
    );
  }
});

module.exports = WeatherForecastDay;