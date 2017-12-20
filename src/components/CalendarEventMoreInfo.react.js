import React, { Component } from 'react';

class CalendarEventMoreInfo extends Component{

  render() {
    
    //  Get the description or a default & cut it down to size
    let description = this.props.eventinfo.description || "";
    description = description.substring(0, 100);

  	return (
        <tr><td style={{"border": "none"}} className="event-moreinfo" colSpan="2">{description}</td></tr>
    );
  }
}

export default CalendarEventMoreInfo;