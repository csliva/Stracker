// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Stack from '../../components/Stack';
import TaskView from '../../components/Task/TaskView';
import { getAllTasks } from '../../actions/app';

class App extends Component {

  componentWillMount(){
    //Get and reset stack data on first load
    getAllTasks(this.props.currentUserId)
  }

  render() {
    return (
      <div className="temp">
        <div className="container">
        <Link className="container__link" to="/invite">Invite Another User</Link>
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
  }),
  { getAllTasks })(App);
