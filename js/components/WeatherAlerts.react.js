var React = require('react');

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
    var title = this.props.alerts[0].title;
    var description = this.props.alerts[0].description || "";
    description = description.substring(0, 400) + "...";

  	return (

        <div className="alert alert-warning">
          <b>{title}</b> {description} 
        </div>
    );
  }
});

module.exports = WeatherAlerts;