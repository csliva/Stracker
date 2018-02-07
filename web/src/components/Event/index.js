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
  render() {
    if (this.props.loadingEvents == false && this.props.taskEvents) {
      return (
      <div>
      {this.props.taskEvents.map((object, i) => {
        return (
          <ul key={i} id={object.id}>
            {object.end_time != null && <li>Seconds: {(Date.parse(object.end_time) - Date.parse(object.start_time))/1000}</li>}
            {object.end_time == null && <p>{Math.ceil((this.props.datetimeNow - Date.parse(object.start_time + '+00:00'))/1000)} seconds</p>}
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
