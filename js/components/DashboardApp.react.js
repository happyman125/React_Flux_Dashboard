import {Component} from 'react';

//  The stores
import PageStore from '../stores/PageStore';
import SettingsStore from '../stores/SettingsStore';

class DashboardApp extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      page: PageStore.getPage(),
      settings: SettingsStore.getSettings()
    };
    
    //  Bind our event handlers:
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    //  If we don't have a calendarid or a zipcode set, we should
    //  try to redirect here (instead of using app.js)

    //  Add store listeners ... and notify ME of changes
    this.pageListener = PageStore.addListener(this._onChange);
    this.settingsListener = SettingsStore.addListener(this._onChange);
  }

  componentWillUnmount() {

    //  Remove store listeners
    this.pageListener.remove();
    this.settingsListener.remove();
  }

  render() {
    //  Determine what page to show
    var ComponentToLoad = this.state.page;

    //  Set the current page and use spread attributes to propigate our current props 
    //  (see https://facebook.github.io/react/docs/jsx-spread.html for more info)
  	return (
      <ComponentToLoad settings={this.state.settings} {...this.props} />
  	);
  }

  _onChange() {
     this.setState({
      page: PageStore.getPage(),
      settings: SettingsStore.getSettings()
    });
  }

}

export default DashboardApp;