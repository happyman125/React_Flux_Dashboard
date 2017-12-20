import React, { Component } from 'react';
import update from 'immutability-helper';

//  The stores
import WeatherStore from '../stores/WeatherStore';
import CalendarStore from '../stores/CalendarStore';
import SettingsStore from '../stores/SettingsStore';

//  The API utils
import CalendarAPIUtils from '../utils/CalendarAPIUtils';
import WeatherAPIUtils from '../utils/WeatherAPIUtils';
import SettingsUtils from '../utils/SettingsUtils';

class DashboardSettings extends Component {

  constructor() {
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
    this._onForecastioAPIChange = this._onForecastioAPIChange.bind(this);
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
    let calendarList = [{ id: "unknown", summary: "Loading..." }];

    //  If the auth check is complete and the user IS authorized,
    //  show the dropdown list of calendars to choose from:
    if (this.state.auth_check_complete && this.state.authorized) {
      calendarList = this.state.calendarList;
    }

    //  If the auth check is complete and the user isn't authorized, show the 'authorize' button
    //  Commented out for now.  Also:  A reference to this button used to be right below 
    //  the calendar selection dropdown
    /*
    let authButton = {};
    if (this.state.auth_check_complete && !this.state.authorized) {
      authButton = <button className="btn btn-default" onClick={this.handleAuth}>Authorize</button>;
    }
    */

    return (
      <div className="container">
        <div className="row">
          <h1>Dashboard settings</h1>
          <div className="col-md-6">
            <form>

              <div className="form-group">
                <label htmlFor="calendarId">Calendar to display</label>
                <select id="calendarIdTest" className="form-control" value={this.state.settings.calendarid} onChange={this._onCalendarIdChange}>
                  {calendarList.map(function (cal) {
                    return <option key={cal.id} value={cal.id}>{cal.summary}</option>;
                  })}
                </select>

                

              </div>

              <div className="form-group">
                <label htmlFor="weathersource">Get weather forecast from</label>
                <div className="radio">
                  <label>
                    <input type="radio" id="radYahoo" name="weathersource" value="Yahoo" onChange={this._onWeatherSourceChange} checked={this.state.settings.weathersource === "Yahoo"} />
                    Yahoo
                  </label>
                </div>
                <div className="radio inline-radio">
                  <label>
                    <input type="radio" id="radForecastio" name="weathersource" value="Forecastio" onChange={this._onWeatherSourceChange} checked={this.state.settings.weathersource === "Forecastio"} />
                    Forecast.io - <a href='https://developer.forecast.io/'>API key</a>:
                  </label>
                  &nbsp;<input id="forecastio_apikey" value={this.state.settings.weathersource_apikey} onChange={this._onForecastioAPIChange} type="text" className="form-control" placeholder="Enter your API key" />
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
                    <input type="radio" name="locationsource" value="browser" onChange={this._onLocationSourceChange} checked={this.state.settings.locationsource === "browser"} />
                    Use the browser
                  </label>
                </div>
                <div className="radio inline-radio">
                  <label>
                    <input type="radio" name="locationsource" value="staticLocation" onChange={this._onLocationSourceChange} checked={this.state.settings.locationsource === "staticLocation"} />
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

    //  Update the weather data
    switch (this.state.settings.weathersource) {
      case "Yahoo":
        WeatherAPIUtils.getCurrentYahooWeather(this.props.coords.latitude, this.props.coords.longitude);
        break;
      case "Forecastio":
        WeatherAPIUtils.getCurrentForecastIOWeather(this.props.coords.latitude, this.props.coords.longitude);
        break;
      default:
        /* No-op */
        break;
    }

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

  _onCalendarIdChange(event) {
    var newState = update(this.state, {
      settings: { calendarid: { $set: event.target.value } }
    });
    this.setState(newState);
  }

  _onZipcodeChange(event) {
    var newState = update(this.state, {
      settings: { zipcode: { $set: event.target.value } }
    });
    this.setState(newState);
  }

  _onForecastioAPIChange(event) {
    var newState = update(this.state, {
      settings: { weathersource_apikey: { $set: event.target.value } }
    });
    this.setState(newState);
  }

  _onWeatherSourceChange(event) {
    var newState = update(this.state, {
      settings: { weathersource: { $set: event.target.value } }
    });

    this.setState(newState);
  }

  _onLocationSourceChange(event) {
    var newState = update(this.state, {
      settings: { locationsource: { $set: event.target.value } }
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