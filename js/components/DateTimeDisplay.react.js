var React = require('react');
var Moment = require('moment');

function getDateTimeState()
{
  var d = new Date();

  return {
    currentDate: Moment().format("dddd, MMMM Do"),
    currentTime: Moment().format("h:mma")
  };
}

var DateTimeDisplay = React.createClass({

  getInitialState: function() {
    return getDateTimeState();
  },
  
  tick: function() {
    this.setState(getDateTimeState());
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <div id="time">{this.state.currentTime}</div>
        <div id="date">{this.state.currentDate}</div>
      </div>
    );
  }

});

module.exports = DateTimeDisplay;