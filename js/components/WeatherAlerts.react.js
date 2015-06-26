var React = require('react');
var Moment = require('moment');

var WeatherAlerts = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    
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
    description = description.substring(0, 400) + "...";

  	return (

        <div id="forecast-alert" className="alert alert-info">
          <b>{title}</b> expires {formattedexpires}
        </div>
    );
  }
});

module.exports = WeatherAlerts;