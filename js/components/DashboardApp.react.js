
import React from 'react';

//  The stores
import PageStore from '../stores/PageStore';
import SettingsStore from '../stores/SettingsStore';

/*
  Get the current state from the GistStore
 */
function getAppState()
{
  return{
    page: PageStore.getPage(),
    settings: SettingsStore.getSettings()
  };
}

var DashboardApp = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    var setState = this.setState;    

    //  Add store listeners ... and notify ME of changes
    this.pageListener = PageStore.addListener(this._onChange);
    this.settingsListener = SettingsStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {

    //  Remove store listeners
    this.pageListener.remove();
    this.settingsListener.remove();
  },

  /**
   * @return {object}
   */
  render: function() {
    //  Determine what page to show
    var ComponentToLoad = this.state.page;

    //  Set the current page and use spread attributes to propigate our current props 
    //  (see https://facebook.github.io/react/docs/jsx-spread.html for more info)
  	return (
      <ComponentToLoad settings={this.state.settings} {...this.props} />
  	);
  },

  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = DashboardApp;