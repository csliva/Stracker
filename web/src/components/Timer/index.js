// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { startTimer, stopTimer, resetTimer, tickTimer } from '../../actions/timer';
import TimeConverted from '../TimeConverted';
//import { css, StyleSheet } from 'aphrodite';

class Timer extends Component {

  props: Props

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

    describeArc(x, y, radius, startAngle, endAngle){
      var start = this.polarToCartesian(x, y, radius, endAngle);
      var end = this.polarToCartesian(x, y, radius, startAngle);

      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");

      return d;
    }

  render() {
    //do some math outside of the view to break seconds counter into minutes and hours
    const timeObj = {
      seconds: this.props.time%60,
      minutes: Math.floor(this.props.time/60)%60,
      hours: Math.floor(this.props.time/3600),
    }
    return (
      <div>
        <TimeConverted time={this.props.time} />
        { /* break - should be done with CSS - FIX */ }
        <p></p>
        { /* if timer is not active, display start button */ }
        {!this.props.timerActive &&
          <div
            onClick={this.props.startTimer}
            className="btn btn-success"
            style={{margin:'0 3px 15px 0'}}>
            Start
          </div>
        }
        { /* if timer is active, show stop and reset button */ }
        {this.props.timerActive &&
          <div
            onClick={this.props.stopTimer}
            className="btn btn-warning"
            style={{margin:'0 3px 15px 0'}}>
            Stop
          </div>
        }
        {this.props.timerActive &&
          <div
            onClick={this.props.resetTimer}
            className="btn btn-danger"
            style={{margin:'0 3px 15px 0'}}>
            Reset
          </div>
        }
        <svg style={{height:"40px",width:"40px"}}>
          <path fill="none" stroke="#446688" strokeWidth="3" d={this.describeArc(16, 24, 10, 0, 359-(timeObj.seconds*6))} />
          <path fill="none" stroke="#5f9a72" strokeWidth="3" d={this.describeArc(16, 24, 14, 0, timeObj.minutes*6)} />
        </svg>
      </div>
    );
  }
}
//using all timer actions and states from ../reducers/timer.js
export default connect(
  state => ({
    time: state.timer.time,
    timerActive: state.timer.timerActive,
  }),
  { startTimer, stopTimer, resetTimer, tickTimer  }
)(Timer);
