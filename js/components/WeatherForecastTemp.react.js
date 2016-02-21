import {Component} from 'react';

//  Components
import WeatherTempPixel from './WeatherTempPixel.react';

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
          <span style={{color: lowColor}}>{this.props.low}</span> • <span style={{color: highColor}}>{this.props.high}</span>
        </div>
    );
  }
}

export default WeatherForecastTemp;