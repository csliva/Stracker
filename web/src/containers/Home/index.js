// @flow
import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router';
//import { logout } from '../../actions/session';

class Home extends Component {

  render() {
    return (
      <main className="app__sections">
      <section className="section section--hero">
        <div className="panel">
          <div className="content content--negative">
            <h2 className="content__headline">Track Time as it Passes <i className="fa fa-clock-o" aria-hidden="true"></i></h2>
            <p>Stack and Track Projects</p>
            <p>Priorities rise to the top while distractions fall away</p>
            <h4 className="content__headline">
              <i className="fa fa-mouse-pointer" aria-hidden="true"></i>Clock In.
              <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>Clock Out.
              <i className="fa fa-bar-chart" aria-hidden="true"></i>Analyze and Invoice your time.</h4>
            <p><Link to="/signup"><button className="button">Get Started</button></Link></p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="panel">
          <div className="content">
            <h2 className="content__headline">Analyze and Improve</h2>
            <p>How much has this project cost?</p>
            <p>How productive is my team?</p>
            <p>What task is the holdup?</p>
            <p><button className="button">Find these Answers</button></p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="panel">
          <div className="content">
            <h2 className="content__headline">Why Use Stracker?</h2>
            <p>Your data is yours. Export and graph time on tasks.</p>
            <p>Simple click timers, so everyone can work more, and track more.</p>
            <p>Project management agnostic. Whether you scrum, agile, kanban, pomodoro, or just do your thing.</p>
            <p><button className="button">Get started</button></p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="panel">
          <div className="content">
            <h2 className="content__headline">One Month Free</h2>
            <p>No credit cards will be charged for the first month.</p>
            <p>No card necessary to take a trial run.</p>
            <p>Annual subscribers will get two months free. Every year.</p>
            <p><button className="button">Get started</button></p>
          </div>
        </div>
      </section>
    </main>

    );
  }
}

export default Home;
