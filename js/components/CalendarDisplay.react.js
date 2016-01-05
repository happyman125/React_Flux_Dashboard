var React = require('react');
import Moment from 'moment';

//  The components
var CalendarEventItem = require('./CalendarEventItem.react');
var CalendarEventMoreInfo = require('./CalendarEventMoreInfo.react');

var CalendarDisplay = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    //  First, see if we have events
    if(this.props.calendar.items == null || this.props.calendar.items.length == 0) {
      return (<div id="calendar-empty">No calendar events left for today</div>);
    }

    //  If we do, display them:
    let formattedStatus = this.props.calendar.summary + ' last updated ' + Moment(this.props.calendar.updated).format("h:mma");

  	return (
        <div>
          <table id="calendar" className="table">
            <tbody>
              {this.props.calendar.items.map(function(eventinfo) {
                return [<CalendarEventItem key={eventinfo.id} eventinfo={eventinfo}/>, <CalendarEventMoreInfo key={"mi"+eventinfo.id} eventinfo={eventinfo}/>];
              })}
            </tbody>
          </table>
          <div className="dashboard-status">{formattedStatus}</div>
        </div>
    );
  }
});

module.exports = CalendarDisplay;
