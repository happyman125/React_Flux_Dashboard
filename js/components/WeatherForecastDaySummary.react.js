var React = require('react');

var WeatherForecastDaySummary = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    
  	return (
        <tr>
          <td style={{"border": "none"}} className="forcast-summary" colSpan="2">{this.props.forecast.summary}</td>
        </tr>
    );
  }
});

module.exports = WeatherForecastDaySummary;