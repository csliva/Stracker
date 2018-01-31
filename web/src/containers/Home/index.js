// @flow
import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router';
//import { logout } from '../../actions/session';

class Home extends Component {

  render() {
    return (

          <div className="container">
            <div className="#">
              <h2 className="#">Track Time as it Passes <i className="fa fa-clock-o" aria-hidden="true"></i></h2>
              <p>Stack and Track Projects</p>
              <p>Priorities rise to the top while distractions fall away</p>
              <h4 className="#">
                <i className="fa fa-mouse-pointer" aria-hidden="true"></i>Clock In.
                <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>Clock Out.
                <i className="fa fa-bar-chart" aria-hidden="true"></i>Analyze and Invoice your time.</h4>
              <p><Link to="/signup"><button className="button is-primary">Get Started</button></Link></p>
            </div>
          </div>

    );
  }
}

export default Home;
