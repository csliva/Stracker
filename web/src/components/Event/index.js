// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { deleteEvent } from '../../actions/events';
import EventAge from '../Timer/EventAge';
import TimeDiff from '../Timer/TimeDiff';

type Props = {
  taskEvents: Object,
  loadingEvents: Boolean,
}

/* TODO: */
/* Hide running clock on events sidebar -- info is repetitive
/* consider turning delete button into its own component
/* add username of WHO added the event
*/

class Event extends Component {

  props: Props

  deleteEvent(eventId){
    this.props.deleteEvent(eventId)
  }
  render() {
    if (this.props.loadingEvents === false && this.props.taskEvents) {
      return (
      <div className="timer">
        <ul className="timer__list">
        {this.props.taskEvents.map((object, i) => {
          if (object.end_time !== null) {
          return (
            <li className="timer__item" key={i} id={object.id}>
              <span><TimeDiff timeObject={object} /> <EventAge insertedAt={object.inserted_at} /></span>
              <span onClick={this.deleteEvent.bind(this,object.id)} className="timer__delete">
                <i className="fa fa-minus"></i>
              </span>
            </li>
          );
        } else { return null; }
        })}
        </ul>
      </div>
    );}
  else {return (null);}
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
