import {Component} from 'react';

//  The components
import WeatherForecastDay from './WeatherForecastDay.react';
import WeatherForecastDaySummary from './WeatherForecastDaySummary.react';

class WeatherForecast extends Component {
  
    render() {

      //  First, see if we have a forecast
      if(this.props.forecastdays.length < 1) {
        return null;
      }

      //  Slice to just the next 5 days:
      var next5days = this.props.forecastdays.slice(0,5);

      return (

          <table id="forcast" className="table table-condensed">
            <tbody>
              {next5days.map(function(forecastday) {
                return [<WeatherForecastDay key={forecastday.day} forecast={forecastday}/>, <WeatherForecastDaySummary key={forecastday.day + "summary"} forecast={forecastday}/>];
              })}
            </tbody>
          </table>
      );
    }

}

export default WeatherForecast;