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
      <header className="app__header">

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link className="nav__link nav__link--branding" to="/">&int;tracker</Link>
            </li>
            {isAuthenticated &&
                <li className="nav__item ">
                  <button
                    className="nav__button"
                    type="button"
                    onClick={this.handleLogout}>
                     Logout | <span>{currentUser.username}</span>
                  </button>
                </li>
            }
            <li className="nav__item nav__item--right">
              <Link className="nav__link"  to="/boards">
                Go to Boards
              </Link>
            </li>

          </ul>
        </nav>

    </header>
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
