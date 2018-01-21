// @flow
import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router';
//import { logout } from '../../actions/session';

class Home extends Component {

  render() {
    return (
      <div style={{ flex: '1' }}>
          <div className="container card">
            <div className="card-content">
              <h2 className="is-size-3 has-text-centered">Track Time as it Passes <i className="fa fa-clock-o" aria-hidden="true"></i></h2>
              <h3 className="is-size-5 has-text-centered">Stack and Track Projects</h3>
              <h4 className="is-size-6 has-text-centered">Priorities rise to the top while distractions fall away</h4>
              <p className="has-text-centered"><Link to="/signup"><button className="button is-primary">Get Started</button></Link></p>
            </div>
          </div>
      </div>
    );
  }
}

export default Home;
