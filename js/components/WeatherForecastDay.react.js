import {Component} from 'react';
import Moment from 'moment';

//  The components
import WeatherForecastIcon from './WeatherForecastIcon.react';
import WeatherForecastTemp from './WeatherForecastTemp.react';

class WeatherForecastDay extends Component {

  render() {
    
    //  Format the display:
    var tempHigh = Math.round(this.props.forecast.high);
    var tempLow = Math.round(this.props.forecast.low);
    var forecastDay = this.props.forecast.date;
    var formattedDay = Moment(forecastDay * 1000).format("dddd");
    var forcastIcon = this.props.forecast.icon;
    var formattedPercentage = "";
    var pollenCount = this.props.forecast.pollen || "";
    var pollenCountClass = "label";

    //  If it looks like it's not clear or partly-anything, then there is probably a change of precipitation:
    if(forcastIcon.indexOf("clear") < 0 && forcastIcon.indexOf("partly") < 0)
    {
      formattedPercentage = Math.floor((this.props.forecast.precipProbability * 100)); 

      //  If we have a percentage and it's greater than 10.. proceed
      if(formattedPercentage > 10)
      { 
        formattedPercentage = formattedPercentage + "%" 
      } 
      else 
      {
        formattedPercentage = "";
      }
    }

    //  Format the pollen count display:
    if(pollenCount <= 3){pollenCountClass = pollenCountClass + " label-default";}
    if(pollenCount > 3 && pollenCount < 7){pollenCountClass = pollenCountClass + " label-info";}
    if(pollenCount >= 7 && pollenCount < 10){pollenCountClass = pollenCountClass + " label-warning";}
    if(pollenCount >= 10){pollenCountClass = pollenCountClass + " label-danger";}

    return (

        <tr className="forcast-datarow">
          <td className="forecast-icon"><WeatherForecastIcon icon={forcastIcon} /> <span style={{color: '#7595AD'}}>{formattedPercentage}</span></td>
          <td>
            {formattedDay}<br/>
            <span className="forcast-summary">{this.props.forecast.summary}</span>            
          </td>
          <td className="forecast-temp"><WeatherForecastTemp low={tempLow} high={tempHigh}/></td>
          <td className="forecast-pollen"><span className={pollenCountClass}>{pollenCount}</span></td>
        </tr>
    );
  }
}

export default WeatherForecastDay;