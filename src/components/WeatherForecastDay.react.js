import React, { Component } from 'react';
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
    var pollenCountClass = "badge";
    var forecastSummary = this.props.forecast.summary.substring(0, 50);

    //  Moon phases described here: 
    //  https://github.com/mourner/suncalc#moon-illumination
    var moonInfo = SunCalc.getMoonIllumination(Moment(forecastDay * 1000).toDate());
    var moonPhase = moonInfo.phase;
    moonPhase = +moonPhase.toFixed(2);

    //  Format the pollen count display:
    if(pollenCount <= 3){pollenCountClass = pollenCountClass + " badge-secondary";}
    if(pollenCount > 3 && pollenCount < 7){pollenCountClass = pollenCountClass + " badge-info";}
    if(pollenCount >= 7 && pollenCount < 10){pollenCountClass = pollenCountClass + " badge-warning";}
    if(pollenCount >= 10){pollenCountClass = pollenCountClass + " badge-danger";}

    return (

        <tr className="forcast-datarow">
          <td className="forecast-icon"><WeatherForecastIcon icon={forcastIcon} /></td>
          <td>
            {formattedDay}<br/>
            <span className="forcast-summary">{forecastSummary}</span>            
          </td>
          <td className="forecast-temp"><WeatherForecastTemp low={tempLow} high={tempHigh}/></td>
          <td className="forecast-moon"><MoonPhaseIcon phase={moonPhase} /></td>
          <td className="forecast-pollen"><span className={pollenCountClass}>{pollenCount}</span></td>
        </tr>
    );
  }
}

export default WeatherForecastDay;