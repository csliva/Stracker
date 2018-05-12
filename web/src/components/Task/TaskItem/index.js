// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { setActiveTask, formDeactivate} from '../../../actions/app';
import { addEvent } from '../../../actions/events'

class Task extends Component {

  // on the first click, we view the task
  viewTaskHandler(id){
    this.props.formDeactivate();
    this.props.setActiveTask(id);
  }
  // if the task is already being viewed, an event needs to be created
  timeEventHandler(id){
    if (id === this.props.currentTask.id)
      this.props.addEvent(id, this.props.runningTimer)
    else { this.viewTaskHandler(id) }
  }

  setClassName(){
    let className = "task"
    if (this.props.runningEvent){
      for(var i = 0; i < this.props.runningEvent.length; i++){
        if (this.props.id === this.props.runningEvent[i].task_id) { className += " task--running" }
      }
      if (this.props.id === this.props.currentTask.id) {
        className += " task--active"
      }
      else {className += " task--inactive"}
    }
    return className
  }

  render() {
    //this is rendered if a task is not active
    if(this.props.formActive){
    return (
      <li
        onClick={this.viewTaskHandler.bind(this, this.props.id)}
        className={this.setClassName()} >
        {this.props.name}
      </li>
    );} else{
    return (
      <li
        onClick={this.timeEventHandler.bind(this, this.props.id)}
        className={this.setClassName()}>
        {this.props.name}
      </li>
    );}
  }
}

export default connect(
  state => ({
    formActive: state.task.formActive,
    currentTask: state.task.currentTask,
    runningEvent: state.event.runningEvent,
  }),
  { setActiveTask, formDeactivate, addEvent}
)(Task);
