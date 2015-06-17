
var React = require('react');

//  Cookie manager
var cookies = require('cookies-js');

//  The stores
var WeatherStore = require('../stores/WeatherStore');
var CalendarStore = require('../stores/CalendarStore');

//  The API utils
var CalendarAPIUtils = require('../utils/CalendarAPIUtils');
var WeatherAPIUtils = require('../utils/WeatherAPIUtils');

/*
  Get the current settings
 */
function getSettings()
{
  return{
    calendarid: CalendarStore.getCalendarId(),
    zipcode: WeatherStore.getPollenZipcode()
  };
}

var DashboardSettings = React.createClass({

  getInitialState: function() {
    return getSettings();
  },

  componentDidMount: function() {
    //  Add store listeners ... and notify ME of changes
    WeatherStore.addChangeListener(this._onChange);
    CalendarStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //  Remove store listeners
    WeatherStore.removeChangeListener(this._onChange);
    CalendarStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {

  	return (
      <div className="container">
        <div className="row">
          <h1>Dashboard settings</h1>
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <label htmlFor="calendarId">Google Calendar Id</label>
                <input id="calendarId" value={this.state.calendarid} onChange={this._onCalendarIdChange} type="text" className="form-control" placeholder="Enter your calendarId" />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zipcode for pollen information</label>
                <input id="zipcode" value={this.state.zipcode} onChange={this._onZipcodeChange} type="text" className="form-control" placeholder="Enter zipcode" />
              </div>            
              <button className="btn btn-primary" onClick={this.handleSave}>Save</button> <a href="#/" className="btn btn-default">Cancel</a>
            </form>
          </div>
        </div>
      </div>
  	);
  },

  handleSave: function(e) {
    e.preventDefault();

    //  Store the calendarId and zipcode
    cookies.set('calendarId', this.state.calendarid);
    cookies.set('zipcode', this.state.zipcode);

    //  Update the calendar data / pollen data:
    CalendarAPIUtils.getCurrentCalendarEvents(this.state.calendarid);
    WeatherAPIUtils.getPollen(this.state.zipcode);
    
    //  Navigate to the main page
    window.location.hash = "#/";
  },

  _onCalendarIdChange: function(event){
    this.setState({calendarid: event.target.value});
  },

  _onZipcodeChange: function(event){
    this.setState({zipcode: event.target.value});
  },

  _onChange: function() {
    this.setState(getSettings());
  }

});

module.exports = DashboardSettings;