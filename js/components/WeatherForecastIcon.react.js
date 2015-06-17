var React = require('react');

var WeatherForecastIcon = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    
    //  Set the default icon:
    var iconClass = "wi-cloud-refresh";

    switch(this.props.icon) {
      case "clear-day":
          iconClass = "wi-day-sunny"
          break;
      case "clear-night":
          iconClass = "wi-night-clear"
          break;
      case "rain":
          iconClass = "wi-rain"
          break;
      case "snow":
          iconClass = "wi-snowflake-cold"
          break;
      case "sleet":
          iconClass = "wi-sleet"
          break;
      case "wind":
          iconClass = "wi-strong-wind"
          break;
      case "fog":
          iconClass = "wi-fog"
          break;
      case "cloudy":
          iconClass = "wi-cloudy"
          break;
      case "partly-cloudy-day":
          iconClass = "wi-day-cloudy"
          break;
      case "partly-cloudy-night":
          iconClass = "wi-night-cloudy"
          break;
    }

    iconClass = "wi " + iconClass;
    
  	return (
        <i className={iconClass}></i>
    );
  }
});

module.exports = WeatherForecastIcon;