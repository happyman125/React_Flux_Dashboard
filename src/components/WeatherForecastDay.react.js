import React, { Component } from 'react';
import Moment from 'moment';
import SunCalc from 'suncalc';

//  The components
import WeatherForecastIcon from './WeatherForecastIcon.react';
import WeatherForecastTemp from './WeatherForecastTemp.react';
import MoonPhaseIcon from './MoonPhaseIcon.react';

//  Stylesheets & images
import 'bootstrap/dist/css/bootstrap.css';

class WeatherForecastDay extends Component {

  render() {
    
    //  Format the display:
    let tempHigh = Math.round(this.props.forecast.high);
    let tempLow = Math.round(this.props.forecast.low);
    let forecastDay = this.props.forecast.date;
    let formattedDay = Moment(forecastDay * 1000).format("dddd M/D");
    let forcastIcon = this.props.forecast.icon;
    let pollenCount = this.props.forecast.pollen || "";
    let pollenCountClass = "badge";
    let forecastSummary = this.props.forecast.summary.substring(0, 50);

    //  Moon phases described here: 
    //  https://github.com/mourner/suncalc#moon-illumination
    let moonInfo = SunCalc.getMoonIllumination(Moment(forecastDay * 1000).toDate());
    let moonPhase = moonInfo.phase;
    moonPhase = +moonPhase.toFixed(2);

    //  Format the pollen count display:
    if(pollenCount <= 2){pollenCountClass = pollenCountClass + " badge-default";}
    if(pollenCount > 2 && pollenCount < 5){pollenCountClass = pollenCountClass + " badge-info";}
    if(pollenCount >= 5 && pollenCount < 9){pollenCountClass = pollenCountClass + " badge-warning";}
    if(pollenCount >= 9){pollenCountClass = pollenCountClass + " badge-danger";}

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