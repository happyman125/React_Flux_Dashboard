//  React and reactstrap
import React, { Component } from 'react';
import {Router, Route} from 'react-enroute';

//  Components
import DashboardHome from './components/DashboardHome.react';
import DashboardSettings from './components/DashboardSettings.react';
import NotFound from './components/NotFound';

//  Stores
import SettingsStore from './stores/SettingsStore';

//  Stylesheets & images
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const getHash = hash => {
  if (typeof hash === 'string' && hash.length > 0) {
    if (hash.substring(0, 1) === '#') {
      return hash.substring(1);
    }
    return hash;
  }
  return '/';
};

class App extends Component {  

  constructor(){
    super();
    this.state = {
      location: getHash(window.location.hash),
      settings: SettingsStore.getSettings()
    };

    //  Bind our events: 
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  hashChangeHandler(e) {
    this.setState({
        location: getHash(window.location.hash)
    });
  }

  componentDidMount(){    
    //  Add a hash change listener:
    window.addEventListener("hashchange", this.hashChangeHandler);

     //  Add store listeners ... and notify ME of changes
	    this.settingsListener = SettingsStore.addListener(this._onChange);      
  }

  componentWillUnmount() {
	    //  Remove store listeners
	    this.settingsListener.remove();
	}

  render() {
    
    return (
      <Router {...this.state} coords={this.props.coords}>
        <Route path="/" component={DashboardHome} />
        <Route path="/settings" component={DashboardSettings} />
        <Route path="*" component={NotFound} />
      </Router>
    );
  }

  _onChange() {
    this.setState({
      settings: SettingsStore.getSettings()
    });
  }

}

export default App;