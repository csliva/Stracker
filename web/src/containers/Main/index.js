/*---------------------------------

MAIN CONTAINER
start of every path
router will path to other users

---------------------------------*/
// @flow
import React, { Component } from 'react';
import { BrowserRouter, Miss, Match } from 'react-router';
import { connect } from 'react-redux';
import { authenticate, unauthenticate, isMobile } from '../../actions/session';
import Home from '../Home';
import App from '../App';
import BoardManagement from '../BoardManagement';
import Notification from '../../components/Notification';
import NotFound from '../../components/Navigation/NotFound';
import Login from '../Login';
import Signup from '../Signup';
import Invite from '../Invite';
import Settings from '../Settings';
import Analytics from '../Analytics';
import MatchAuthenticated from '../../components/Navigation/MatchAuthenticated';
import RedirectAuthenticated from '../../components/Navigation/RedirectAuthenticated';
import Navbar from '../../components/Navbar';
import RunningClocks from '../../components/Timer/RunningClocks';
import { start_timer, end_timer, tick_tock } from '../../actions/timer';

<<<<<<< HEAD
class Main extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.updateLayout()
    window.addEventListener('resize', this.updateLayout.bind(this));
=======


class Main extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
>>>>>>> frontend
    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
    this.updateLayout();
    window.addEventListener('resize', this.updateLayout.bind(this));
  }

  updateLayout(){
    if(window.innerWidth <= 767){
      this.props.isMobile(true),
      () => console.log('mobile layout');
    } else {
      this.props.isMobile(false),
      () => console.log('desktop layout');
    }
  }

  updateLayout(){
    if(window.innerWidth <= 767){
      this.props.isMobile(true);
    } else {
      this.props.isMobile(false);
    }
  }

  timer = () => {
   this.props.tick_tock()
  }
  //start timer
  componentWillMount(){
   var intervalId = setInterval(this.timer, 1000);
   this.props.start_timer(intervalId);
   this.updateLayout();

  }
  //stop timer
  componentWillUnmount() {
   this.props.end_timer(this.props.intervalId)
   window.removeEventListener('resize', this.updateLayout.bind(this));
  }

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };
    let appClass = this.props.mobile ? 'app app--mobile' : 'app';

    let appClass = this.props.mobile ? 'app app--mobile' : 'app';

    return (
      <BrowserRouter>
        <div className={appClass}>
          <Navbar />
          <div className="app__body">
            <Notification/>
            <Match exactly pattern="/home" component={Home} {...authProps} />
            <MatchAuthenticated exactly pattern="/boards" component={BoardManagement} {...authProps} />
            <MatchAuthenticated exactly pattern="/" component={App} {...authProps} />
            <MatchAuthenticated exactly pattern="/analytics" component={Analytics} {...authProps} />
            <MatchAuthenticated exactly pattern="/settings" component={Settings} {...authProps} />
            <MatchAuthenticated exactly pattern="/invite" component={Invite} {...authProps} />
            <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
            <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
            <Miss component={NotFound} />
          </div>
          <footer className="app__footer">
            © &int;tracker 2018 | Colt Sliva | Kyle Treptow
          </footer>
          <RunningClocks />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
    mobile: state.session.mobile
  }),
  { authenticate, unauthenticate, isMobile, start_timer, end_timer, tick_tock  }
)(Main);
