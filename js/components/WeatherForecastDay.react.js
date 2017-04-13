import {Component} from 'react';
import Moment from 'moment';
import SunCalc from 'suncalc';

//  The components
import WeatherForecastIcon from './WeatherForecastIcon.react';
import WeatherForecastTemp from './WeatherForecastTemp.react';
import MoonPhaseIcon from './MoonPhaseIcon.react';

class WeatherForecastDay extends Component {

  render() {
    
    //  Format the display:
    var tempHigh = Math.round(this.props.forecast.high);
    var tempLow = Math.round(this.props.forecast.low);
    var forecastDay = this.props.forecast.date;
    var formattedDay = Moment(forecastDay * 1000).format("dddd");
    var forcastIcon = this.props.forecast.icon;
    var pollenCount = this.props.forecast.pollen || "";
    var pollenCountClass = "label";

    //  Moon phases described here: 
    //  https://github.com/mourner/suncalc#moon-illumination
    var moonInfo = SunCalc.getMoonIllumination(Moment(forecastDay * 1000).toDate());
    var moonPhase = moonInfo.phase;
    moonPhase = +moonPhase.toFixed(2);

    //  Format the pollen count display:
    if(pollenCount <= 3){pollenCountClass = pollenCountClass + " label-default";}
    if(pollenCount > 3 && pollenCount < 7){pollenCountClass = pollenCountClass + " label-info";}
    if(pollenCount >= 7 && pollenCount < 10){pollenCountClass = pollenCountClass + " label-warning";}
    if(pollenCount >= 10){pollenCountClass = pollenCountClass + " label-danger";}

    return (

        <tr className="forcast-datarow">
          <td className="forecast-icon"><WeatherForecastIcon icon={forcastIcon} /></td>
          <td>
            {formattedDay}<br/>
            <span className="forcast-summary">{this.props.forecast.summary}</span>            
          </td>
          <td className="forecast-temp"><WeatherForecastTemp low={tempLow} high={tempHigh}/></td>
          <td className="forecast-moon"><MoonPhaseIcon phase={moonPhase} /></td>
          <td className="forecast-pollen"><span className={pollenCountClass}>{pollenCount}</span></td>
        </tr>
    );
  }
}

export default WeatherForecastDay;