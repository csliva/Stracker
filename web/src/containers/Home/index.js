// @flow
import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { Link } from 'react-router';
//import { logout } from '../../actions/session';
import Navbar from '../../components/Navbar';
import StackList from '../../components/StackList';
import StackView from '../../components/StackView';

class Home extends Component {

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <div style={{ flex: '1', height: '89%'}}>
          <StackList />
          <StackView />
        </div>
      </div>
    );
  }
}

export default Home;
