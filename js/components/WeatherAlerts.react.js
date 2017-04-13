import {Component} from 'react';
import Moment from 'moment';

class WeatherAlerts extends Component{

  render() {
    
    //  First, see if we have any alerts
    if(this.props.alerts.length < 1) {
      return null;
    }

    //  If we have multiple, just display the first one:
    var alert = this.props.alerts[0];
    var title = alert.title;
    var expires = alert.expires;
    var formattedexpires = Moment(expires * 1000).fromNow();
    var description = alert.description || "";
    description = description.substring(0, 150) + "...";

    // If there is an 'elipsis' at the beginning 
    // of the description, remove it:
    if(description.substring(0, 3) == "...")
    {
      description = description.substring(3);
    }

    //  If there is an 'elipsis' in the description, 
    //  break the description on that   
    if(description.indexOf("...") > 0)
    {
      var breakLocation = description.indexOf("...");
      description = description.substring(0, breakLocation);      
    }

  	return (

        <div className="alert alert-info">
          <span className="forecast-alert-title"><b>{title}</b> expires {formattedexpires}</span><br/>
          <span>{description}</span>
        </div>
    );
  }
}

export default WeatherAlerts;