import React, { Component } from 'react';
import Moment from 'moment';

class CalendarEventItem extends Component{

  render() {
    
    //  Format the display:
    var eventStart = "All day";
    var eventEnd = "";

    if(this.props.eventinfo.start.dateTime != null)
    {
      eventStart = Moment(this.props.eventinfo.start.dateTime).format("h:mma");
      eventEnd = " - " + Moment(this.props.eventinfo.end.dateTime).format("h:mma");
    }

    var summary = this.props.eventinfo.summary;

  	return (
        <tr><td>{eventStart}{eventEnd}</td><td>{summary}</td></tr>
    );
  }
}

export default CalendarEventItem;