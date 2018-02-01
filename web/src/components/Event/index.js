// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events';

type Props = {
  getEvents: () => void,
  taskEvents: Object,
  loadingEvents: Boolean
}

class Event extends Component {
  componentWillMount(){

  }
  render() {
    if (this.props.loadingEvents == false) {
      return (
      <div>
      {this.props.taskEvents.map(function(object, i){
        return (
          <ul key={i} id={object.id}>
            <li>Start: {object.start_time}</li>
            <li>End: {object.end_time}</li>
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
