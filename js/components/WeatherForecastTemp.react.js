import {Component} from 'react';

//  Components
import WeatherTempPixel from './WeatherTempPixel.react';

//  Utils
import WeatherAPIUtils from '../utils/WeatherAPIUtils';

class WeatherForecastTemp extends Component {

  render() {
    //  Build an array that contains one element for each temperature in the temperature range for the day.
    let forecastTemps = [];
    for (let i = this.props.low; i <= this.props.high; i++) { 
      forecastTemps.push(i);
    }

    //  The elements start on the left side
    //  They are padded using 0+starting temperature
    //  The array is padded on the right side with 120-end temperature
    let leftPad = this.props.low * 2;
    let rightPad = 240 - (this.props.high * 2);

    //  The final display should look like this:
    //  [low][left pad][temp-range][right pad][high]

    
    //  Return the html:
    return (

        <div>
          {this.props.low}
          <div className="temp-pixel-pad" style={{width: leftPad}} />

          {forecastTemps.map(function(forecasttemp) {
              return <WeatherTempPixel key={forecasttemp} temp={forecasttemp}/>;
          })}

          <div className="temp-pixel-pad" style={{width: rightPad}} />
          {this.props.high}
        </div>
    );
  }
}

export default WeatherForecastTemp;