import React, { Component } from 'react';

//  Utils
import WeatherAPIUtils from '../utils/WeatherAPIUtils';

class WeatherForecastTemp extends Component {

  render() {

    //  Set the temperature colors:
    let highColor = WeatherAPIUtils.getTempColor(this.props.high);
    let lowColor = WeatherAPIUtils.getTempColor(this.props.low);
    
    //  Return the html:
    return (

        <div>
          <span style={{color: highColor}}>{this.props.high}</span> • <span style={{color: lowColor}}>{this.props.low}</span> 
        </div>
    );
  }
}

export default WeatherForecastTemp;