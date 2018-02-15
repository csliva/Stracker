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
      <div>
      <div style={{ width: '100%', height: '60px' }}>
        <div style={{ float: 'right', marginLeft: '.5rem' }} onClick={this.deleteHandler.bind(this, currentTask.id)} className="button is-danger">
          Delete
        </div>
        <div style={{ float: 'right', marginLeft: '.5rem' }} onClick={this.editHandler.bind(this, currentTask.id)} className="button is-warning">
          Edit
        </div>
      </div>
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>{currentTask.task_title}</h3>
        <div style={{ textAlign: 'center' }}>{currentTask.description}</div>
        < Event />
      </div>
    );
  }
}

export default connect(
  state => ({
    currentTask: state.task.currentTask,
    intervalId: state.timer.intervalId
  }),
  {deleteTask, activateEdit, start_timer, end_timer, tick_tock}
)(TaskDetails);
