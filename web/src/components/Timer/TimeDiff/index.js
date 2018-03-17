// web/src/components/Timer/TimeDiff -- VIEW -- REPEATABLE
import React, { Component} from 'react';
import { connect } from 'react-redux';

class TimeDiff extends Component {
  parseTime(time){
    //preventative fix when it calculates to 23:59:59
    if (time < 1000) { time = 0 }
    //FUNC: take a time and turn it into HH:MM:SS format
    return new Date(time).toISOString().substr(11, 8);
  }
  render(){
    let obj = this.props.timeObject;
    //timeObject will be a vanilla prop
    if (obj && this.props.datetimeNow){
      let eventDiff = Date;
      //if end time is available from the database, then it is a complete event
      if ( obj.end_time !== null ){
        eventDiff = this.parseTime(Date.parse(obj.end_time) - Date.parse(obj.start_time))
      }
      // if end time is null, we use a javascript clock to get the time difference
      else if ( obj.end_time === null ){
        eventDiff = this.parseTime(this.props.datetimeNow - Date.parse(obj.start_time + '+00:00'))
      }
      return (<span>{eventDiff}</span>);
    }
    else { return null }
  }//end render
}

export default connect(
  state => ({
    datetimeNow: state.timer.datetimeNow,
  }),
  {}
)(TimeDiff);
