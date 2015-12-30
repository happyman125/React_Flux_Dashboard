import React from 'react/addons';

//  The stores
import WeatherStore from '../stores/WeatherStore';
import CalendarStore from '../stores/CalendarStore';
import SettingsStore from '../stores/SettingsStore';

//  The API utils
import CalendarAPIUtils from '../utils/CalendarAPIUtils';
import WeatherAPIUtils from '../utils/WeatherAPIUtils';
import SettingsUtils from '../utils/SettingsUtils';

class DashboardSettings extends React.Component {
  
  constructor(){
    super();

    //  Set initial state:
    this.state = {
      settings: SettingsStore.getSettings(),
      calendarList: CalendarStore.getCalendarList(),
      auth_check_complete: CalendarStore.authCheckFinished(),
      authorized: CalendarStore.areAuthorized()
    };

    //  Bind our events:
    this._onChange = this._onChange.bind(this);
    this._onZipcodeChange = this._onZipcodeChange.bind(this);
    this._onCalendarIdChange = this._onCalendarIdChange.bind(this);
    this._onWeatherSourceChange = this._onWeatherSourceChange.bind(this);
    this._onLocationSourceChange = this._onLocationSourceChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    //  Add store listeners ... and notify ME of changes
    this.weatherListener = WeatherStore.addListener(this._onChange);
    this.calendarListener = CalendarStore.addListener(this._onChange);
    this.settingsListener = SettingsStore.addListener(this._onChange);
  }

  componentWillUnmount() {
    //  Remove store listeners
    this.weatherListener.remove();
    this.calendarListener.remove();
    this.settingsListener.remove();
  }

  render() {

    //  Shorten the calendarlist name for now:
    let calendarList = [{id: "unknown", summary: "Loading..."}];
    let authButton = {};

    //  If the auth check is complete and the user IS authorized,
    //  show the dropdown list of calendars to choose from:
    if(this.state.auth_check_complete && this.state.authorized){
      calendarList = this.state.calendarList;
    }

    //  If the auth check is complete and the user isn't authorized, show the 'authorize' button
    if(this.state.auth_check_complete && !this.state.authorized){
      authButton = <button className="btn btn-default" onClick={this.handleAuth}>Authorize</button>;
    }

    return (
      <div className="container">
        <div className="row">
          <h1>Dashboard settings</h1>
          <div className="col-md-6">
            <form>

              <div className="form-group">                
                <label htmlFor="calendarId">Calendar to display</label>                
                <select id="calendarIdTest" className="form-control" value={this.state.settings.calendarid} onChange={this._onCalendarIdChange}>
                  {calendarList.map(function(cal) {
                    return <option key={cal.id} value={cal.id}>{cal.summary}</option>;
                  })}
                </select>

                {authButton}
              </div>

              <div className="form-group">
                <label htmlFor="weathersource">Get weather forecast from</label>
                <div className="radio">
                  <label>
                    <input type="radio" id="radYahoo" name="weathersource" value="Yahoo" onChange={this._onWeatherSourceChange} checked={this.state.settings.weathersource === "Yahoo"} />
                    Yahoo
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" id="radForecastio" name="weathersource" value="Forecastio" onChange={this._onWeatherSourceChange} checked={this.state.settings.weathersource === "Forecastio"}/>
                    Forecast.io
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="zipcode">Zipcode for pollen information</label>
                <input id="zipcode" value={this.state.settings.zipcode} onChange={this._onZipcodeChange} type="text" className="form-control" placeholder="Enter zipcode" />
              </div>

              <div className="form-group">
                <label>Location data</label>
                <div className="radio">
                  <label>
                    <input type="radio" name="locationsource" value="browser" onChange={this._onLocationSourceChange} checked={this.state.settings.locationsource === "browser"}/>
                    Use the browser
                  </label>
                </div>
                <div className="radio inline-radio">
                  <label>
                    <input type="radio" name="locationsource" value="staticLocation" onChange={this._onLocationSourceChange} checked={this.state.settings.locationsource === "staticLocation"}/>
                    Always use this location:
                  </label>
                  &nbsp;<input id="staticLocation" type="text" className="form-control" placeholder="Enter location coordinates" />
                </div>
              </div>


              <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleSave}>Save</button> <a href="#/" className="btn btn-default">Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleSave(e) {
    e.preventDefault();

    //  Update the calendar data / pollen data:
    CalendarAPIUtils.getCalendarEvents(this.state.settings.calendarid);
    WeatherAPIUtils.getPollen(this.state.settings.zipcode);
    
    //  Save the settings:
    SettingsUtils.saveSettings(this.state.settings);

    //  Navigate to the main page
    window.location.hash = "#/";
  }

  handleAuth(e) {
    e.preventDefault();

    console.log("Handling Calendar authorization in settings.  Calling calendar utils...");
    CalendarAPIUtils.handleCalendarAuthClick(e);
  }

  _onCalendarIdChange(event){
    //  Using new Immutability helpers from 
    //  https://facebook.github.io/react/docs/update.html
    var newState = React.addons.update(this.state, {
      settings: {calendarid: {$set: event.target.value}}
    });
    this.setState(newState);
  }

  _onZipcodeChange(event){
    //  Using new Immutability helpers from 
    //  https://facebook.github.io/react/docs/update.html
    var newState = React.addons.update(this.state, {
      settings: {zipcode: {$set: event.target.value}}
    });
    this.setState(newState);
  }

  _onWeatherSourceChange(event){
    //  Using new Immutability helpers from 
    //  https://facebook.github.io/react/docs/update.html
    var newState = React.addons.update(this.state, {
      settings: {weathersource: {$set: event.target.value}}
    });

    this.setState(newState);
  }

  _onLocationSourceChange(event){
    //  Using new Immutability helpers from 
    //  https://facebook.github.io/react/docs/update.html
    var newState = React.addons.update(this.state, {
      settings: {locationsource: {$set: event.target.value}}
    });

    this.setState(newState);
  }

  _onChange() {
    this.setState({
      settings: SettingsStore.getSettings(),
      calendarList: CalendarStore.getCalendarList(),
      auth_check_complete: CalendarStore.authCheckFinished(),
      authorized: CalendarStore.areAuthorized()
    });
  }

}

export default DashboardSettings;