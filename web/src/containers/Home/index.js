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
            <h2 className="content__headline">Another Section Here</h2>
            <p>Lorem ipsum dolor sit amet, mazim dissentias eu mel. Ex duo aeque offendit reformidans. Et facer erroribus iracundia pro. Ne esse minimum mea, dicam eirmod sea an.</p>
            <p>Elit tollit vidisse mea eu. Eam an debitis mandamus, in est maiorum insolens. At qui commodo graecis invidunt, nam ferri contentiones et, ei vim quodsi verear. Eruditi contentiones cu sea.</p>
            <p><button className="button">Get Started</button></p>
          </div>
        </div>
      </section>
    </main>

    );
  }
}

export default Home;
