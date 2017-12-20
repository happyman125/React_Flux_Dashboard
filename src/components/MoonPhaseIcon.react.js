import React, { Component } from 'react';

class MoonPhaseIcon extends Component{

  render() {
    
    //  Set the default icon:
    var iconClass = "wi-moon-waning-crescent-6";

    if (this.props.phase < .03) { iconClass = "wi-moon-new"; } else
    if (this.props.phase < .06) { iconClass = "wi-moon-waxing-crescent-1"; } else
    if (this.props.phase < .09) { iconClass = "wi-moon-waxing-crescent-2"; } else
    if (this.props.phase < .12) { iconClass = "wi-moon-waxing-crescent-3"; } else
    if (this.props.phase < .15) { iconClass = "wi-moon-waxing-crescent-4"; } else
    if (this.props.phase < .18) { iconClass = "wi-moon-waxing-crescent-5"; } else
    if (this.props.phase < .21) { iconClass = "wi-moon-waxing-crescent-6"; } else
    if (this.props.phase < .26) { iconClass = "wi-moon-first-quarter"; } else
    if (this.props.phase < .27) { iconClass = "wi-moon-waxing-gibbous-1"; } else
    if (this.props.phase < .30) { iconClass = "wi-moon-waxing-gibbous-2"; } else
    if (this.props.phase < .33) { iconClass = "wi-moon-waxing-gibbous-3"; } else
    if (this.props.phase < .36) { iconClass = "wi-moon-waxing-gibbous-4"; } else
    if (this.props.phase < .41) { iconClass = "wi-moon-waxing-gibbous-5"; } else
    if (this.props.phase < .47) { iconClass = "wi-moon-waxing-gibbous-6"; } else
    if (this.props.phase < .51) { iconClass = "wi-moon-full"; } else
    if (this.props.phase < .53) { iconClass = "wi-moon-waning-gibbous-1"; } else
    if (this.props.phase < .56) { iconClass = "wi-moon-waning-gibbous-2"; } else
    if (this.props.phase < .59) { iconClass = "wi-moon-waning-gibbous-3"; } else
    if (this.props.phase < .63) { iconClass = "wi-moon-waning-gibbous-4"; } else
    if (this.props.phase < .68) { iconClass = "wi-moon-waning-gibbous-5"; } else
    if (this.props.phase < .72) { iconClass = "wi-moon-waning-gibbous-6"; } else
    if (this.props.phase < .77) { iconClass = "wi-moon-third-quarter"; } else
    if (this.props.phase < .80) { iconClass = "wi-moon-waning-crescent-1"; } else
    if (this.props.phase < .83) { iconClass = "wi-moon-waning-crescent-2"; } else
    if (this.props.phase < .86) { iconClass = "wi-moon-waning-crescent-3"; } else
    if (this.props.phase < .89) { iconClass = "wi-moon-waning-crescent-4"; } else
    if (this.props.phase < .94) { iconClass = "wi-moon-waning-crescent-5"; } else
    if (this.props.phase < .99) { iconClass = "wi-moon-waning-crescent-6"; }

    //  Make sure the additional 'wi' class is added:
    iconClass = "wi " + iconClass;
    
  	return (
        <i className={iconClass} rel="tooltip" title={this.props.phase}></i>
    );
  }
}

export default MoonPhaseIcon;