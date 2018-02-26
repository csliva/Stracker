// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import distanceInWords from 'date-fns/distance_in_words'
import differenceInSeconds from 'date-fns/difference_in_seconds'

type Props = {
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
      event_time = this.parsetime(Date.parse(object.end_time) - Date.parse(object.start_time))
    }
    // if end time is null, we use a javascript clock to get the time difference
    else if ( object.end_time === null ){
      event_time = this.parsetime((this.props.datetimeNow - Date.parse(object.start_time + '+00:00')))
    }
    return(
      <li>{event_time} - {this.date_view(object.inserted_at)} ago</li>
    );
  }
  date_view(inserted_at){
    let dt = distanceInWords(Date.parse(inserted_at), Date.now())
    return (
      <span className = "date">{dt}</span>
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
  {}
)(Event);
