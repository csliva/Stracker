// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../actions/session';
import { formActivate } from '../../actions/app';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    height: '10%',
    background: '#fff',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  link: {
    color: '#555459',
    fontSize: '22px',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },
});

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
      <div className={css(styles.navbar)}>
      <nav className="col-md-5">
        <Link to="/" className={css(styles.link)}>Quanta Stack</Link>
      </nav>
      <div className="col-md-4" style={{float: 'right'}}>
        {!this.props.formActive &&
          <div>
            {this.props.timerActive && <span style={{float: 'left'}}> Time: {this.props.time}</span>}
            <div style={{float: 'right'}} className="btn btn-success" onClick={this.clickHandler.bind(this, this.props.id)}>Back to Stack</div>
          </div>
        }
      </div>
      {isAuthenticated &&
          <div className="col-md-3" style={{float: 'right'}}>
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
    time: state.timer.time,
    timerActive: state.timer.timerActive,
    formActive: state.stack.formActive,
  }),
  { logout, formActivate }
)(Navbar);
