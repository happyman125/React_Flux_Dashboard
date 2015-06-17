
var React = require('react');

//  The components
var DateTimeDisplay = require('./DateTimeDisplay.react');
var WeatherDisplay = require('./WeatherDisplay.react');
var CalendarDisplay = require('./CalendarDisplay.react');

//  The API utils
var WeatherAPIUtils = require('../utils/WeatherAPIUtils');
var CalendarAPIUtils = require('../utils/CalendarAPIUtils');

//  The stores
var WeatherStore = require('../stores/WeatherStore');
var CalendarStore = require('../stores/CalendarStore');

/*
  Get the current state
 */
function getAppState()
{
  return{
    weather: WeatherStore.getWeather(),
    pollen: WeatherStore.getPollen(),
    calendarinfo: CalendarStore.getCalendarData(),
    calendarid: CalendarStore.getCalendarId()
  };
}

var DashboardHome = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  tick: function() {
    //  Get the latest weather:
    WeatherAPIUtils.getCurrentWeather(this.props.position.coords.latitude, this.props.position.coords.longitude);
    WeatherAPIUtils.getPollen(this.props.zipcode);

    //  Get the latest calendar information:
    CalendarAPIUtils.getCurrentCalendarEvents(this.props.calendarid);
  },

  componentDidMount: function() {
    var setState = this.setState;    

    //  Add an interval tick for every 5 minutes:
    this.interval = setInterval(this.tick, 300000);

    //  Add store listeners ... and notify ME of changes
    WeatherStore.addChangeListener(this._onChange);
    CalendarStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //  Clear the interval:
    clearInterval(this.interval);

    //  Remove store listeners
    WeatherStore.removeChangeListener(this._onChange);
    CalendarStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {

  	return (
      <div className="container-fluid">
         <div className="row">
          
          <div className="col-sm-6">
            <WeatherDisplay weather={this.state.weather} pollen={this.state.pollen} />
          </div>

          <div className="col-sm-6">
            <DateTimeDisplay />
            <CalendarDisplay calendar={this.state.calendarinfo} />
          </div>

        </div>
      </div>
  	);
  },

  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = DashboardHome;