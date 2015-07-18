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
    var pollenCount = this.props.forecast.pollen || "";
    var pollenCountClass = "label";

    //  If it looks like it's not clear or partly-anything, then there is probably a change of precipitation:
    if(forcastIcon.indexOf("clear") < 0 && forcastIcon.indexOf("partly") < 0)
    {
      formattedPercentage = Math.floor((this.props.forecast.precipProbability * 100)); 
      formattedPercentage = formattedPercentage + "%"
    }

    //  Format the pollen count display:
    if(pollenCount <= 3){pollenCountClass = pollenCountClass + " label-default";}
    if(pollenCount > 3 && pollenCount < 7){pollenCountClass = pollenCountClass + " label-info";}
    if(pollenCount >= 7 && pollenCount < 10){pollenCountClass = pollenCountClass + " label-warning";}
    if(pollenCount >= 10){pollenCountClass = pollenCountClass + " label-danger";}

  	return (

        <tr className="forcast-datarow">
          <td>{formattedDay}</td>
          <td><WeatherForecastIcon icon={forcastIcon} /> <span style={{color: '#7595AD'}}>{formattedPercentage}</span></td>
          <td>{tempLow} • {tempHigh}</td>
          <td></td>
          <td><span className={pollenCountClass}>{pollenCount}</span></td>
        </tr>
    );
  }
});

module.exports = WeatherForecastDay;