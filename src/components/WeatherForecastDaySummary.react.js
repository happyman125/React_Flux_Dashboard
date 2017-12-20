import React, { Component } from 'react';

class WeatherForecastDaySummary extends Component{

  render() {
    
  	return (
        <tr>
          <td style={{"border": "none"}} className="forcast-summary" colSpan="2">{this.props.forecast.summary}</td>
        </tr>
    );
  }
}

export default WeatherForecastDaySummary;