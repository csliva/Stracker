/*---------------------------------

MAIN CONTAINER
start of every path
router will path to other users

---------------------------------*/
// @flow
import React, { Component } from 'react';
import { BrowserRouter, Miss, Match } from 'react-router';
import { connect } from 'react-redux';
import { authenticate, unauthenticate } from '../../actions/session';
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
import RunningEvent from '../../components/Event/RunningEvent';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

class Main extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: Props

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <BrowserRouter>
        <div className="app">
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
          < RunningEvent />
          <footer className="app__footer">
            © &int;tracker 2018 | Colt Sliva | Kyle Treptow
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }),
  { authenticate, unauthenticate }
)(Main);
