// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from '../../Event';
import { deleteTask , activateEdit } from '../../../actions/app';
import { start_timer, end_timer, tick_tock } from '../../../actions/timer';

type Props = {
  currentTask: Object
}

class TaskDetails extends Component {

  props: Props

  timer = () => {
   this.props.tick_tock()
  }

  deleteHandler(id){
    this.props.deleteTask(id);
  }

  editHandler(id){
    this.props.activateEdit(id);
  }

  timer = () => {
   this.props.tick_tock()
  }

  componentWillMount(){
   var intervalId = setInterval(this.timer, 1000);
   this.props.start_timer(intervalId);
  }

  componentWillUnmount() {
   this.props.end_timer(this.props.intervalId)
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
            <b>CURRENT TIMER WILL GO HERE</b>
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
    intervalId: state.timer.intervalId
  }),
  {deleteTask, activateEdit, start_timer, end_timer, tick_tock }
)(TaskDetails);
