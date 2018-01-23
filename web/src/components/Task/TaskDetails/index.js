// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTask , activateEdit } from '../../../actions/app';

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
      </div>
    );
  }
}

export default connect(
  state => ({
    currentTask: state.task.currentTask,
  }),
  {deleteTask, activateEdit}
)(TaskDetails);
