// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Stack from '../../components/Stack';
import TaskView from '../../components/Task/TaskView';
import { getAllTasks } from '../../actions/app';
import { fetchCurrentBoard } from '../../actions/boards';

class App extends Component {

  componentDidMount(){
    // if board is not set in localStorage
    if ( localStorage.board === undefined ||
        localStorage.board === null ) {
      window.location.href = '/boards';
    }
    else if ( this.props.activeBoard.length === 0 ){
      // if board is set in localStorage but board data is not stored in the client
      this.props.fetchCurrentBoard(localStorage.board)
    }
    else{
      //get all tasks for currentBoard
      getAllTasks(this.props.currentUserId)
    }
  }
  render() {
    return (
      <div className="temp">
        <div className="container">
        <Link className="button" to="/invite">Invite Another User</Link>
          <div className="columns">
            <Stack />
            <TaskView />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentUserId: state.session.currentUser.id,
    activeBoard: state.boards.activeBoard
  }),
  { getAllTasks, fetchCurrentBoard })(App);
