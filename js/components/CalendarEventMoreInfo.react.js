var React = require('react');

var CalendarEventMoreInfo = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    
    //  Get the description or a default & cut it down to size
    var description = this.props.eventinfo.description || "";
    var description = description.substring(0, 100);

  	return (
        <tr><td style={{"border": "none"}} className="event-moreinfo" colSpan="2">{description}</td></tr>
    );
  }
});

module.exports = CalendarEventMoreInfo;