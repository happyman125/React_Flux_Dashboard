import React, { Component } from 'react';

//  Stylesheets & images
import 'weathericons/css/weather-icons.css';

class WeatherForecastIcon extends Component {

    render() {

        //  Yahoo numeric codes are here: https://developer.yahoo.com/weather/documentation.html
        //  Forecast.io icon codes are here: https://developer.forecast.io/docs/v2#forecast_call

        //  Set the default icon:
        let iconClass = "wi-cloud-refresh";

        switch (this.props.icon) {
            case "clear-day":
            case "32":
            case "34":
            case "36":
                iconClass = "wi-day-sunny"
                break;
            case "clear-night":
            case "31":
            case "33":
                iconClass = "wi-night-clear"
                break;
            case "rain":
            case "1":
            case "8":
            case "9":
            case "10":
            case "11":
            case "12":
            case "17":
            case "35":
            case "40":
                iconClass = "wi-rain"
                break;
            case "3":
            case "4":
            case "37":
            case "38":
            case "39":
            case "45":
            case "47":
                iconClass = "wi-thunderstorm"
                break;
            case "snow":
            case "5":
            case "13":
            case "14":
            case "15":
            case "16":
            case "25":
            case "41":
            case "42":
            case "43":
            case "46":
                iconClass = "wi-snowflake-cold"
                break;
            case "sleet":
            case "6":
            case "7":
            case "18":
                iconClass = "wi-sleet"
                break;
            case "wind":
            case "24":
            case "19":
            case "23":
                iconClass = "wi-strong-wind"
                break;
            case "fog":
            case "20":
            case "21":
            case "22":
                iconClass = "wi-fog"
                break;
            case "cloudy":
            case "26":
                iconClass = "wi-cloudy"
                break;
            case "partly-cloudy-day":
            case "28":
            case "30":
            case "44":
                iconClass = "wi-day-cloudy"
                break;
            case "partly-cloudy-night":
            case "27":
            case "29":
                iconClass = "wi-night-cloudy"
                break;
            default:
                /* No-op */
                break;
        }

        iconClass = "wi " + iconClass;

        return (
            <i className={iconClass}></i>
        );
    }
}

export default WeatherForecastIcon;