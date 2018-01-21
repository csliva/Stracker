// @flow
import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { Link } from 'react-router';
//import { logout } from '../../actions/session';
import StackList from '../../components/StackList';
import StackView from '../../components/StackView';

class App extends Component {

  render() {
    return (
      <div style={{ flex: '1' }}>
        <div className="container">
          <div className="columns" style={{ flex: '1', height: '89%'}}>
            <StackList />
            <StackView />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
