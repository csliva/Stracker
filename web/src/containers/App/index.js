// @flow
import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { Link } from 'react-router';
//import { logout } from '../../actions/session';
import Stack from '../../components/Stack';
import TaskView from '../../components/Task/TaskView';

class App extends Component {

  render() {
    return (
      <div className="temp">
        <div className="container">
          <div className="columns">
            <Stack/>
            <TaskView />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
