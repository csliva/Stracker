// @flow
import React, { Component} from 'react';

class TimeConverted extends Component {

  render() {

    //do some math outside of the view to break seconds counter into minutes and hours
    const timeObj = {
      seconds: this.props.time%60,
      minutes: Math.floor(this.props.time/60)%60,
      hours: Math.floor(this.props.time/3600),
    }

    return (
      <div>
      { /* only show time if it is greater than 0 */ }
      { timeObj.hours > 0 &&
        <span>
          { /* output hours */ }
          {timeObj.hours}
          { /* sugar to check if hour is singular or plural */}
          {timeObj.hours === 1 ? <span> hour</span> : <span> hours</span>}
        </span>
      }

      { /* Add a comma after hours */ }
      { timeObj.hours > 0 && timeObj.minutes > 0 && <span>, </span>}

      { /* check if minutes should be displayed */ }
      { timeObj.minutes > 0 &&
        <span>
          { /* output minutes */ }
          {timeObj.minutes}
          { /* sugar to check if minutes is singular or plural */ }
          {timeObj.minutes === 1 ? <span> minute</span> : <span> minutes</span>}
        </span>
      }

      { /* use an and here if both minutes and seconds are displayed */ }
      { timeObj.minutes > 0 && timeObj.seconds > 0 && <span> and </span>}

      { /* seconds will only display once timer has started */ }
      { timeObj.seconds > 0 &&
        <span>
          { /* output seconds */ }
          {timeObj.seconds}
          { /* sugar...may not be necessary as second displays 1/60 */ }
          {timeObj.seconds === 1 ? <span> second</span> : <span> seconds</span>}
        </span>
      }
      </div>
    );
  }
}
//using all timer actions and states from ../reducers/timer.js
export default TimeConverted;
