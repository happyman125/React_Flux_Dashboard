import React from 'react';

//  Cookie manager
import cookies from 'cookies-js';

//  The stores
import WeatherStore from '../stores/WeatherStore';
import CalendarStore from '../stores/CalendarStore';

//  The API utils
import CalendarAPIUtils from '../utils/CalendarAPIUtils';
import WeatherAPIUtils from '../utils/WeatherAPIUtils';

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

class DashboardSettings extends React.Component {
  
  constructor(){
    super();

    //  Set initial state:
    this.state = getSettings();

    //  Bind our events:
    this._onChange = this._onChange.bind(this);
    this._onZipcodeChange = this._onZipcodeChange.bind(this);
    this._onCalendarIdChange = this._onCalendarIdChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    //  Add store listeners ... and notify ME of changes
    WeatherStore.addChangeListener(this._onChange);
    CalendarStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    //  Remove store listeners
    WeatherStore.removeChangeListener(this._onChange);
    CalendarStore.removeChangeListener(this._onChange);
  }

  render() {

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
  }

  handleSave(e) {
    e.preventDefault();

    //  Store the calendarId and zipcode
    cookies.set('calendarId', this.state.calendarid, { expires: Infinity });
    cookies.set('zipcode', this.state.zipcode, { expires: Infinity });

    //  Update the calendar data / pollen data:
    CalendarAPIUtils.getCurrentCalendarEvents(this.state.calendarid);
    WeatherAPIUtils.getPollen(this.state.zipcode);
    
    //  Navigate to the main page
    window.location.hash = "#/";
  }

  _onCalendarIdChange(event){
    this.setState({calendarid: event.target.value});
  }

  _onZipcodeChange(event){
    this.setState({zipcode: event.target.value});
  }

  _onChange() {
    this.setState(getSettings());
  }

}

export default DashboardSettings;