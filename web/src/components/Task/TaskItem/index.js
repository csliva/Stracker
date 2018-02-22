// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { setActiveTask, formDeactivate} from '../../../actions/app';
import { addEvent } from '../../../actions/events'

type Props = {
  setActiveTask: () => void,
  currentTask: Number,
  formActive: Boolean,
}

class Task extends Component {

  props: Props

  // on the first click, we view the task
  viewTaskHandler(id){
    this.props.formDeactivate();
    this.props.setActiveTask(id);
  }
  // if the task is already being viewed, an event needs to be created
  timeEventHandler(id){
    if (id === this.props.currentTask.id)
      this.props.addEvent(id)
    else { this.viewTaskHandler(id) }
  }
  render() {
    if(this.props.formActive){
    return (
      <li
        onClick={this.viewTaskHandler.bind(this, this.props.id)}
        className="#" >
        {this.props.name}
      </li>
    );} else{
    return (
      <li
        onClick={this.timeEventHandler.bind(this, this.props.id)}
        className="#"
      >
        {this.props.name}
      </li>
    );}
  }
}

export default connect(
  state => ({
    formActive: state.task.formActive,
    currentTask: state.task.currentTask
  }),
  { setActiveTask, formDeactivate, addEvent}
)(Task);
