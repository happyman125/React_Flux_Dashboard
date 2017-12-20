import React, { Component } from 'react';
import Moment from 'moment';

class DateTimeDisplay extends Component{

  constructor(props) {
    super(props);

    this.state = {
      currentDate: Moment().format("dddd, MMMM Do"),
      currentTime: Moment().format("h:mma")
    };

    //  Bind our event handlers:
    this.tick = this.tick.bind(this);
  }
  
  tick() {
    this.setState({
      currentDate: Moment().format("dddd, MMMM Do"),
      currentTime: Moment().format("h:mma")
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
  	return (
      <div>
        <div id="time">{this.state.currentTime}</div>
        <div id="date">{this.state.currentDate}</div>
      </div>
    );
  }

}

export default DateTimeDisplay;