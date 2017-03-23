// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../actions/session';
import Navbar from '../../components/Navbar';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        {isAuthenticated &&
          <div style={{float: 'right'}}>
            <span>{currentUser.username}</span>
            <button style={{ margin: '0 10px' }} className="btn btn-default" type="button" onClick={this.handleLogout}>Logout</button>
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
)(Home);