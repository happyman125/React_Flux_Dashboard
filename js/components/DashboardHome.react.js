
var React = require('react');

//  The components
var DateTimeDisplay = require('./DateTimeDisplay.react');
var WeatherDisplay = require('./WeatherDisplay.react');
var CalendarDisplay = require('./CalendarDisplay.react');
var NewsDisplay = require('./NewsDisplay.react')

//  The API utils
var WeatherAPIUtils = require('../utils/WeatherAPIUtils');
var CalendarAPIUtils = require('../utils/CalendarAPIUtils');
var NewsAPIUtils = require('../utils/NewsAPIUtils');

//  The stores
var WeatherStore = require('../stores/WeatherStore');
var CalendarStore = require('../stores/CalendarStore');
var NewsStore = require('../stores/NewsStore');

/*
  Get the current state
 */
function getAppState()
{
  return{
    weather: WeatherStore.getWeather(),
    pollen: WeatherStore.getPollen(),
    calendarinfo: CalendarStore.getCalendarData(),
    calendarid: CalendarStore.getCalendarId(),
    news: NewsStore.getBreakingNews()
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

    //  Get the latest breaking news:
    NewsAPIUtils.getTwitterFeed(this.props.breakingnewsuser);
  },

  componentDidMount: function() {
    var setState = this.setState;    

    //  Add an interval tick for every 5 minutes:
    this.interval = setInterval(this.tick, 300000);

    //  Add store listeners ... and notify ME of changes
    WeatherStore.addChangeListener(this._onChange);
    CalendarStore.addChangeListener(this._onChange);
    NewsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //  Clear the interval:
    clearInterval(this.interval);

    //  Remove store listeners
    WeatherStore.removeChangeListener(this._onChange);
    CalendarStore.removeChangeListener(this._onChange);
    NewsStore.removeChangeListener(this._onChange);
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

        <NewsDisplay news={this.state.news} />
      </div>
  	);
  },

  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = DashboardHome;