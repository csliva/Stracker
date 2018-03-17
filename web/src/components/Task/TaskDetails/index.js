// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from '../../Event';
import { deleteTask , activateEdit } from '../../../actions/app';
import TimeDiff from '../../Timer/TimeDiff';

type Props = {
  currentTask: Object
}

class TaskDetails extends Component {

  props: Props

  deleteHandler(id){
    this.props.deleteTask(id);
  }

  editHandler(id){
    this.props.activateEdit(id);
  }

  currentTimer(){
    //temporary solution to get currentTimer
    if (this.props.taskEvents !== undefined) {
    //options to find currentTimer:
    //Query database and return information with getCurrentTask
    //filter runningTimers with currentEvents to find
    let ct = undefined;

    for (var i = 0; i < this.props.taskEvents.length; i++) {
        for (var j = 0; j < this.props.runningEvent.length; j++) {
            if (this.props.taskEvents[i].id === this.props.runningEvent[j].id) {
                ct = this.props.taskEvents[i];
                break;
            }
        }
    }
    if (ct){ return (< TimeDiff timeObject={ct} />) }
    else { return null; }
    }
  else { return null; }
  }

  render() {
    let { currentTask } = this.props;
    return (
      <div className="details__panel">
        <ul className="list list--inline">
          <li className="list__item">
            <button className="button" onClick={this.deleteHandler.bind(this, currentTask.id)}>
              Delete
            </button>
          </li>
          <li className="list__item">
            <button className="button" onClick={this.editHandler.bind(this, currentTask.id)}>
              Edit
            </button>
          </li>
        </ul>
        <h3 className="details__title">{currentTask.task_title}</h3>
        <p className="details__description">{currentTask.description}</p>
        <div className="currenttime">
          <h4>
            <i className="currenttime__icon fa fa-clock-o"></i>
            <b>{this.currentTimer()}</b>
          </h4>
        </div>
        <Event />
      </div>
    );
  }
}

export default connect(
  state => ({
    currentTask: state.task.currentTask,
    intervalId: state.timer.intervalId,
    taskEvents: state.event.taskEvents,
    runningEvent: state.event.runningEvent
  }),
  {deleteTask, activateEdit }
)(TaskDetails);
