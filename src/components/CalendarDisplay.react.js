import React, { Component } from 'react';
import Moment from 'moment';

//  The components
import CalendarEventItem from './CalendarEventItem.react';
import CalendarEventMoreInfo from './CalendarEventMoreInfo.react';

class CalendarDisplay extends Component {

  /**
   * @return {object}
   */
  render() {
    //  If we don't seem to have calendar data, display the default message
    if(!this.props.calendar.hasOwnProperty('items') || this.props.calendar.items.length === 0) {
      return (<div id="calendar-empty">No calendar events left for today</div>);
    }

    //  If we do, display them:
    let formattedStatus = this.props.calendar.summary + ' last updated ' + Moment(this.props.calendar.updated).format("h:mma");

  	return (
        <div>
          <div id="calendar-status" className="dashboard-status">{formattedStatus}</div>
          <table id="calendar" className="table">
            <tbody>
              {this.props.calendar.items.map(function(eventinfo) {
                return [<CalendarEventItem key={eventinfo.id} eventinfo={eventinfo}/>, <CalendarEventMoreInfo key={"mi"+eventinfo.id} eventinfo={eventinfo}/>];
              })}
            </tbody>
          </table>          
        </div>
    );
  }
}

export default CalendarDisplay;