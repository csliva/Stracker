// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { deleteEvent } from '../../actions/events';
import distanceInWords from 'date-fns/distance_in_words'

type Props = {
  taskEvents: Object,
  loadingEvents: Boolean,
}

class Event extends Component {

  props: Props

  parseTime(time){
    //preventative fix when it calculates to 23:59:59
    if (time < 1000) { time = 0 }
    //FUNC: take a time and turn it into HH:MM:SS format
    return new Date(time).toISOString().substr(11, 8);
  }

  deleteEvent(eventId){
    this.props.deleteEvent(eventId)
  }

  updated_by(){

  }

  dateView(inserted_at){
    let dt = distanceInWords(Date.parse(inserted_at), Date.now())
    return (
      <span className="date">{dt}</span>
    );
  }

  eventView(object){
    //FUNC: test if end_time exists and then return an li
    let event_time = Date;

    //if end time is available from the database, then it is a complete event
    if ( object.end_time !== null ){
      event_time = this.parseTime(Date.parse(object.end_time) - Date.parse(object.start_time))
    }
    // if end time is null, we use a javascript clock to get the time difference
    else if ( object.end_time === null ){
      event_time = this.parseTime(this.props.datetimeNow - Date.parse(object.start_time + '+00:00'))
    }
    // this is the actual event value
    return(
      <span>{event_time} - {this.dateView(object.inserted_at)} ago <span onClick={this.deleteEvent.bind(this,object.id)} className="button button__delete"><i className="fa fa-minus"></i></span></span>
    );
  }
  render() {
    if (this.props.loadingEvents === false && this.props.taskEvents) {
      return (
      <div className="timer">
        <ul className="timer__list">
        {this.props.taskEvents.map((object, i) => {
          return (
            <li className="timer__item" key={i} id={object.id}>
              {this.eventView(object)}
            </li>
          );
        })}
        </ul>
      </div>
    );}
  else {return (<div></div>);}
  }
}

export default connect(
  state => ({
    taskEvents: state.event.taskEvents,
    loadingEvents: state.event.loadingEvents,
    datetimeNow: state.timer.datetimeNow,
    boardUsers: state.boards.boardUsers
  }),
  { deleteEvent }
)(Event);
