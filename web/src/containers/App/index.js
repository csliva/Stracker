// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Stack from '../../components/Stack';
import TaskView from '../../components/Task/TaskView';
import RunningClocks from '../../components/Timer/RunningClocks';
import { getAllTasks } from '../../actions/app';
import { fetchCurrentBoard } from '../../actions/boards';
import { start_timer, end_timer, tick_tock } from '../../actions/timer';

class App extends Component {

  timer = () => {
   this.props.tick_tock()
  }
  //start timer
  componentWillMount(){
   var intervalId = setInterval(this.timer, 1000);
   this.props.start_timer(intervalId);
  }
  //stop timer
  componentWillUnmount() {
   this.props.end_timer(this.props.intervalId)
  }

  //we need to pause app until data is loaded

  renderPreload(){
    // if board is not set in localStorage, make user select a board
    if ( localStorage.board === undefined || localStorage.board === null ) {
      window.location.href = '/boards';
    }
    else if ( this.props.activeBoard === undefined ){
      // if board is set in localStorage but board data is not stored in the client
      // IE After a refresh
      // fetch the board data
      // will also getAllTasks
      this.props.fetchCurrentBoard(localStorage.board)
      return ( null );
    }
    else if ( !this.props.stack.data ){
      //while stack is not loaded, load them in
      this.props.getAllTasks(this.props.currentUserId)
      return ( null )
    }
    else {
      //return the view, all data is available and renderable
      return (
        <div className="temp">
          <div className="container">
          <Link className="button" to="/invite">Invite Another User</Link>
            <div className="columns">
              <Stack />
              <TaskView />
            </div>
            <RunningClocks />
          </div>
        </div>
      );
    }
  }
  render() {
    //conditional rendering needed to ensure data is available and renderable
    return this.renderPreload();
  }
}

export default connect(
  state => ({
    currentUserId: state.session.currentUser.id,
    activeBoard: state.boards.activeBoard,
    loadingStack: state.task.loadingStack,
    stack: state.task.stack
  }),
  { getAllTasks, fetchCurrentBoard, start_timer, end_timer, tick_tock })(App);
