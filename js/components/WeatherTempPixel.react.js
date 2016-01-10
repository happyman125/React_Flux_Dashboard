import {Component} from 'react';

//  Utils
import WeatherAPIUtils from '../utils/WeatherAPIUtils';

class WeatherTempPixel extends Component {

  render() {
    
    //  Set the current temperature color:
    let tempColor = WeatherAPIUtils.getTempColor(this.props.temp);

    //  Return the html:
    return (
        <div className="temp-pixel" style={{backgroundColor: tempColor}} />
    );
  }
}

export default WeatherTempPixel;