// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../actions/session';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;
    return (
      <div className="navbar box">
      <nav className="navbar-brand navbar-start">
        <Link className="title" to="/">&int;tracker</Link>
      </nav>
      {isAuthenticated &&
          <div className="navbar-end">
            <span>{currentUser.username}</span>
            <button style={{ margin: '0 10px' }} className="button is-default" type="button" onClick={this.handleLogout}>Logout</button>
          </div>
      }
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(Navbar);
