// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../actions/session';
import { formActivate } from '../../actions/app';

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

  clickHandler(){
    this.props.formActivate();
  }

  render() {
    const { currentUser, isAuthenticated } = this.props;
    return (
      <div className="navbar box">
      <nav className="navbar-brand navbar-start">
        <Link className="title" to="/">&int;tracker</Link>
      </nav>
      <div className="col-md-4">
        {!this.props.formActive &&
          <div>
            {this.props.timerActive && <span> Time: {this.props.time}</span>}
            <div className="button is-success" onClick={this.clickHandler.bind(this, this.props.id)}>Back to Stack</div>
          </div>
        }
        {this.props.editActive &&
          <div>
            {this.props.timerActive && <span> Time: {this.props.time}</span>}
            <div className="button is-success" onClick={this.clickHandler.bind(this, this.props.id)}>New Stack</div>
          </div>
        }
      </div>
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
    time: state.timer.time,
    timerActive: state.timer.timerActive,
    formActive: state.stack.formActive,
    editActive: state.stack.editActive,
  }),
  { logout, formActivate }
)(Navbar);
