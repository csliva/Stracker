// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formActivate, newTask, editTask, setActiveTask } from '../../../actions/app';

import TaskForm from '../../Forms/NewTask';
import EditForm from '../../Forms/EditTask';
import TaskDetails from '../TaskDetails';

class TaskView extends Component {

  handleNewTask = data => {
    data.board_id = localStorage.board;
    this.props.newTask(data);
  }

  handleEditTask = data => {
    this.props.editTask(data);
    this.props.setActiveTask(this.props.currentTask.id)
  }

  render() {
    if (this.props.formActive && !this.props.editActive){
      return (
        <div className="#">
          < TaskForm onSubmit={this.handleNewTask} />
        </div>
      );
    }
    if (this.props.formActive && this.props.editActive){
      return (
        <div className="#">
          < EditForm onSubmit={this.handleEditTask} currentTask={this.props.currentTask}/>
        </div>
      );
    }
    else{
      return (
        <div className={`card is-two-thirds column`}>
          < TaskDetails />
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    formActive: state.task.formActive,
    editActive: state.task.editActive,
    currentUser: state.session.currentUser,
    currentTask: state.task.currentTask,
    currentBoard: state.boards.activeBoard
  }),
  { formActivate, newTask, editTask, setActiveTask  }
)(TaskView);
