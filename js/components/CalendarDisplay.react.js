var React = require('react');
var Moment = require('moment');

//  The components
var CalendarEventItem = require('./CalendarEventItem.react');
var CalendarEventMoreInfo = require('./CalendarEventMoreInfo.react');

var CalendarDisplay = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    //  First, see if we have events
    if(this.props.calendar.items == null) {
      return (<div id="calendar-empty">No calendar events left for today</div>);
    }

    //  If we do, display them:
  	return (
        <table id="calendar" className="table">
          <tbody>
            {this.props.calendar.items.map(function(eventinfo) {
              return [<CalendarEventItem key={eventinfo.id} eventinfo={eventinfo}/>, <CalendarEventMoreInfo key={"mi"+eventinfo.id} eventinfo={eventinfo}/>];
            })}
          </tbody>
        </table>
    );
  }
});

module.exports = CalendarDisplay;
