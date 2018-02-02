// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events';
import Moment from 'react-moment';
import moment from 'moment';

type Props = {
  getEvents: () => void,
  taskEvents: Object,
  loadingEvents: Boolean
}

class Event extends Component {
  render() {
    if (this.props.loadingEvents == false && this.props.taskEvents) {
      return (
      <div>
      {this.props.taskEvents.map(function(object, i){
        return (
          <ul key={i} id={object.id}>
            {object.end_time != null && <li>Seconds: {(Date.parse(object.end_time) - Date.parse(object.start_time))/1000}</li>}
            {object.end_time == null && <li>Seconds: {<Moment diff={moment.utc().valueOf()} interval={1}>{moment.utc(object.start_time).valueOf()}</Moment>}</li>}
          </ul>
        );
      })}
      </div>
    );}
  else {return (<div></div>);}
  }
}

/*
{this.props.taskEvents.map(function(object, i){
  return (
    <ul key={i} id={object.id}>
      <li>Start: {object.start_time}</li>
      <li>End: {object.end_time}</li>
    </ul>
  );
})}
*/

export default connect(
  state => ({
    taskEvents: state.event.taskEvents,
    loadingEvents: state.event.loadingEvents
  }),
  { getEvents }
)(Event);
