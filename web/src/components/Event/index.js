// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events';

type Props = {
  getEvents: () => void,
  taskEvents: Object,
  loadingEvents: Boolean,
}

class Event extends Component {

  props: Props

  parsetime(time){
    return new Date(time).toISOString().substr(11, 8);
  }
  event_view(object){
    let event_time = Date;
    //if end time is available from the database, then it is a complete event
    if ( object.end_time != null ){
      event_time = this.parsetime(Math.ceil(Date.parse(object.end_time) - Date.parse(object.start_time)))
    }
    // if end time is null, we use a javascript clock to get the time difference
    else if ( object.end_time === null ){
      event_time = this.parsetime(Math.ceil((this.props.datetimeNow - Date.parse(object.start_time + '+00:00'))))
    }
    return(
      <li>{event_time}</li>
    );
  }
  render() {
    if (this.props.loadingEvents === false && this.props.taskEvents) {
      return (
      <div>
      {this.props.taskEvents.map((object, i) => {
        return (
          <ul key={i} id={object.id}>
            {this.event_view(object)}
          </ul>
        );
      })}
      </div>
    );}
  else {return (<div></div>);}
  }
}

export default connect(
  state => ({
    taskEvents: state.event.taskEvents,
    loadingEvents: state.event.loadingEvents,
    datetimeNow: state.timer.datetimeNow
  }),
  { getEvents }
)(Event);
